using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Application.Items.Commands
{
    public class Create
    {
        public class Command : IRequest
        {
            public Item Item { get; set; }
            public string User { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ItemDbContext _context;
            private readonly IImageUpload _imgUpload;
            
            public Handler(ItemDbContext context, IImageUpload imageUpload)
            {
                _imgUpload = imageUpload;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var items = await _context.Items.ToListAsync(cancellationToken);

                if (items.Any(item => item.Equals(request.Item)))
                {
                    throw new ConflictException("Such item already exists");
                }
                
                if (request.Item.PostedFiles != null)
                {
                    List<String> urls = _imgUpload.UploadImages(request.Item.PostedFiles);
                
                    foreach(String url in urls)
                    {
                        _context.Images.Add(new ListingImage
                        {
                            ListingId = request.Item.Id,
                            ImageUrl = url
                        });
                    }
                }

                request.Item.Uploader = await _context.Users.FindAsync(request.User);
                
                _context.Items.Add(request.Item);
                
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}
