using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
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
        public class Query : IRequest<Result<List<Item>>>
        {
            
        }
        public class Handler : IRequestHandler<Query, Result<List<Item>>>
        {
            private readonly ItemDbContext _context;
            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Item>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Item>>.Success(await _context.Items.ToListAsync(cancellationToken));
            }
        }
    }
}
