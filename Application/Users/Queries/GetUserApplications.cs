using Domain.Entities;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
    public class GetUserContributions
    {
        public class Query : IRequest<List<PointContributor>>
        {
            public string User { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<PointContributor>>
        {
            private readonly ItemDbContext _context;
            public Handler(ItemDbContext context)
            {
                _context = context;
            }
            public async Task<List<PointContributor>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contributions = await _context.Contributors.Where(s => s.User == request.User).ToListAsync();

                return contributions;
            }
        }
    }
}
