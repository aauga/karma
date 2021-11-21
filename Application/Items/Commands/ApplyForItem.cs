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
using Application.Core;
using Application.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Application.Items.Commands
{
    public class ApplyForItem
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string User { get; set; }
            public Applicant Contributor { get; set; }
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
                var user = await _context.Users.FindAsync(request.User);
                if(item == null)
                {
                    ///throw exception
                }
                if(user == null)
                {
                    ///throw exception
                }
                request.Contributor.User = user.Username;
                await _context.Applicants.AddAsync(request.Contributor);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
