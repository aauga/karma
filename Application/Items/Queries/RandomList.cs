using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items.Queries
{
    public class RandomListQuery : IRequest<IEnumerable<Item>>
    {
        public int Amount { get; set; }
        public ItemCategories Category { get; set; }
    }

    public class Handler : IRequestHandler<RandomListQuery, IEnumerable<Item>>
    {
        private readonly ItemDbContext _context;

        public Handler(ItemDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Item>> Handle(RandomListQuery request, CancellationToken cancellationToken)
        {
            var items = await _context.Items
                .Where(x => !x.IsSuspended && x.Category == request.Category)
                .ToListAsync(cancellationToken);
            
            var len = items.Count;
            
            var r = new Random();
            var list = items.Take(request.Amount).ToList();

            for (int i = 0; i < len; i++)
            {
                int j = r.Next(i + 1);

                if (j < request.Amount)
                {
                    list[j] = items.ElementAt(i);
                }
            }
            
            foreach(var item in list)
            {
                var urls = new List<String>();
                var result = _context.Images.Where(s => s.ListingId == item.Id);
                
                foreach (var image in result)
                {
                    urls.Add(image.ImageUrl);
                }
                
                item.ImageUrls = urls;
            }

            return list;
        }
    }
}