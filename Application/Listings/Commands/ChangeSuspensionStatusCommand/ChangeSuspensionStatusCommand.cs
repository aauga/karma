using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Listings.Commands.ChangeSuspensionStatusCommand
{
    public class ChangeSuspensionStatusCommand : IRequest
    {
        public Guid ItemId { get; set; }
        public string UserId { get; set; }
        public string Applicant { get; set; }
    }

    public class Handler : IRequestHandler<ChangeSuspensionStatusCommand>
    {
        private readonly ItemDbContext _context;
        
        public Handler(ItemDbContext context)
        {
            _context = context;
        }
        
        public async Task<Unit> Handle(ChangeSuspensionStatusCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User), request.UserId);
            }

            var item = await _context.Items
                .Where(item => item.Id == request.ItemId)
                .Include(x => x.Applicants)
                .FirstOrDefaultAsync();

            if (item == null)
            {
                throw new NotFoundException(nameof(Item), request.ItemId);
            }

            if (item.Uploader != user.Username)
            {
                throw new ConflictException("Item does not belong to requester.");
            }

            var applicant = await _context.Users
                .Where(x => x.Username == request.Applicant)
                .FirstOrDefaultAsync();

            if (applicant == null)
            {
                throw new NotFoundException(nameof(Applicant), request.Applicant);
            }

            var application = item.Applicants.Where(x => x.UserId == applicant.AuthId).FirstOrDefault();

            if (application == null)
            {
                throw new NotFoundException($"Application for item {request.ItemId} from user {request.Applicant} does not exist");
            }

            application.IsSuspended = !application.IsSuspended;

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}