using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class OnRegister
    {
        public class Command : IRequest
        {
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
                var check =_context.Users.FindAsync(request.User);
                if (check == null)
                {
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
            }
        }
    }
}
