using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using Hangfire;
using MediatR;
using Persistence;
using Services;

namespace Application.Items.Commands.CreateItem
{
    public class CreateItemCommand : IRequest<Item>
    {
        public Item Item { get; set; }
        public string User { get; set; }
    }

    public class Handler : IRequestHandler<CreateItemCommand, Item>
    {
        private readonly ItemDbContext _context;
        private readonly IImageUpload _imgUpload;
        private readonly Redeemer _redeemer;
        
        public Handler(ItemDbContext context, IImageUpload imageUpload, Redeemer winnerPicker)
        {
            _imgUpload = imageUpload;
            _context = context;
            _redeemer = winnerPicker;
        }
        
        public async Task<Item> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.User);

            if(user == null)
            {
                throw new NotFoundException(nameof(User), request.User); 
            }
            
            request.Item.Id = Guid.NewGuid();
            
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
            
            request.Item.Uploader = user.Username;
            request.Item.Redeemer = null;
            
            request.Item.Uploaded = DateTime.Now;
            request.Item.ExpirationDate = DateTime.Now.AddMinutes(30);
            
            request.Item.IsSuspended = false;
            request.Item.Applicants = new List<Applicant>();

            await _context.Items.AddAsync(request.Item);
            await _context.SaveChangesAsync();
                
            BackgroundJob.Schedule(() => _redeemer.StartSelection(request.Item.Id), TimeSpan.FromMinutes(30));

            return request.Item;
        }
    }
}
