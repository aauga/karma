using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Items.Queries
{
    public class List
    {
        public class Query : IRequest<object>
        {
            public uint Page { get; set; }
            public uint ItemsPerPage { get; set; }
        }
        public class Handler : IRequestHandler<Query, object>
        {
            private readonly ItemDbContext _context;
            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<object> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Item> items = await _context.Items
                    .Where(s => !s.IsSuspended)
                    .OrderByDescending(x => x.Uploaded)
                    .Skip((int) ((request.Page - 1) * request.ItemsPerPage))
                    .Take((int) request.ItemsPerPage)
                    .ToListAsync(cancellationToken);
                
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

                var totalItems = _context.Items.Count();
                var totalPages = (int) Math.Ceiling((float) totalItems / request.ItemsPerPage);
                
                Object pagination = new
                    {TotalPages = totalPages, request.Page, request.ItemsPerPage};

                return new {Pagination = pagination, Items = items};
            }
        }
    }
}
