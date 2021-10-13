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

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<List<Item>>
        {
            
        }
        public class Handler : IRequestHandler<Query, List<Item>>
        {
            private readonly ItemDbContext _context;
            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<List<Item>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Item> items = await _context.Items.ToListAsync(cancellationToken);
                foreach(Item item in items)
                {
                    List<String> urls = new List<String>();
                    var result = _context.Images.Where(s => s.ListingId == item.Id).ToList();
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
}
