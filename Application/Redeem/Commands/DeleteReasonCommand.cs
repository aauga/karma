using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Redeem.Commands
{
    public class DeleteReasonCommand : IRequest
    {
        public string UserId { get; set; }
        public Guid ItemId { get; set; }
    }

    public class Handler : IRequestHandler<DeleteReasonCommand>
    {
        private readonly ItemDbContext _context;
        
        public Handler(ItemDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteReasonCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(user => user.Applications)
                .FirstOrDefaultAsync(x => x.AuthId == request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User), request.UserId);
            }
            
            var item = await _context.Items
                .Include(item => item.Applicants)
                .FirstOrDefaultAsync(x => x.Id == request.ItemId);

            if (item == null)
            {
                throw new NotFoundException(nameof(Item), request.ItemId);
            }

            if (item.IsSuspended)
            {
                throw new ConflictException("You can not make any changes when the item is suspended.");
            }
            
            var application = item.Applicants.FirstOrDefault(x => x.UserId == request.UserId);

            if (application == null)
            {
                throw new NotFoundException("You have not applied for this item.");
            }

            user.Applications.Remove(application);
            item.Applicants.Remove(application);
            
            await _context.SaveChangesAsync();
            
            return Unit.Value;
        }
    }
}