using Application.Core;
using Domain.Entities;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ItemDbContext _context;

            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);

                if(item == null)
                {
                    return null;
                }

                _context.Remove(item);
                var result = await _context.SaveChangesAsync() > 0;

                if(!result)
                {
                    return Result<Unit>.Failure("Failed to delete an item");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
