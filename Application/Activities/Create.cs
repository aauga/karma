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

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Item Item { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ItemDbContext _context;
            private readonly ImageUpload _imgUpload;
            public Handler(ItemDbContext context, IImageUpload imageUpload)
            {
                _imgUpload = (ImageUpload)imageUpload;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
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
                _context.Items.Add(request.Item);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
