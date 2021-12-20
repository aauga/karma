using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Listings.Queries.GetActiveListingsQuery
{
    public class GetActiveListingsQuery : IRequest<IEnumerable<Item>>
    {
        public string UserId { get; set; }
    }

    public class Handler : IRequestHandler<GetActiveListingsQuery, IEnumerable<Item>>
    {
        private readonly ItemDbContext _context;

        public Handler(ItemDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Item>> Handle(GetActiveListingsQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User), request.UserId);
            }
            
            var items = await _context.Items.Where(item => !item.IsSuspended && item.Uploader == user.Username).ToListAsync();

            foreach (var item in items)
            {
                var urls = new List<string>();
                var result = _context.Images.Where(s => s.ListingId == item.Id);
                    
                foreach (var image in result)
                {
                    urls.Add(image.ImageUrl);
                }
                    
                item.ImageUrls = urls;
            }
            
            return items;
        }
    }
}