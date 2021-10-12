using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Items.Commands
{
    public class Redeem
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ItemDbContext _context;

            public Handler(ItemDbContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);

                if (item == null)
                {
                    throw new NotFoundException(nameof(Item), request.Id);
                }

                if (item.Redeemer != null)
                {
                    throw new ConflictException($"Item {request.Id} has already been redeemed");
                }

                if (item.Uploader == request.User)
                {
                    throw new ConflictException($"Item {request.Id} belongs to the client, therefore can not be redeemed");
                }

                item.Redeemer = request.User;

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}