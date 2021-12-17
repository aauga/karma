using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Redeem.Queries
{
    public class GetReasonQuery : IRequest<ItemApplication>
    {
        public string UserId { get; set; }
        public Guid ItemId { get; set; }
    }

    public class Handler : IRequestHandler<GetReasonQuery, ItemApplication>
    {
        private readonly ItemDbContext _context;

        public Handler(ItemDbContext context)
        {
            _context = context;
        }

        public async Task<ItemApplication> Handle(GetReasonQuery request, CancellationToken cancellationToken)
        {
            var item = await _context.Items
                .Include(item => item.Applicants)
                .FirstOrDefaultAsync(x => x.Id == request.ItemId, cancellationToken);

            if (item == null)
            {
                throw new NotFoundException(nameof(Item), request.ItemId);
            }
            
            var application = item.Applicants.FirstOrDefault(x => x.UserId == request.UserId);

            if (application == null)
            {
                throw new NotFoundException("You have not applied for this item.");
            }

            return new ItemApplication { Reason = application.Reason };
        }
    }
}