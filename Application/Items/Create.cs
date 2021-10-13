using Application.Core;
using Domain.Entities;
using FluentValidation;
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

namespace Application.Items
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Item Item { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Item).SetValidator(new ItemValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ItemDbContext _context;
            private readonly ImageUpload _imgUpload;
            public Handler(ItemDbContext context, IImageUpload imageUpload)
            {
                _imgUpload = (ImageUpload)imageUpload;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
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
                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create an item");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
