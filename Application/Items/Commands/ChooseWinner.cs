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
using Hangfire;

namespace Application.Items.Commands
{
    public class ChooseWinner
    {
        public class Command : IRequest
        {
            public String User { get; set; }
            public Guid ItemId { get; set; }
            public Applicant Winner { get; set; }
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
                var item = await _context.Items.FindAsync(request.ItemId);
                var winner = await _context.Applicants.FindAsync(request.Winner.User);

                if (item == null)
                {
                    throw new NotFoundException(nameof(Item), request.ItemId);
                }
                if (!request.Winner.Equals(winner))
                {
                    ///Throw exception such contributor doesnt exist
                }
                if (item.IsSuspended)
                {
                    ///Item is suspended
                }

                if (item.IsRecieved)
                {
                    ///Item already redeemed
                }
                if (item.Redeemer != null)
                {
                    throw new ConflictException($"Item {request.ItemId} has already been redeemed");
                }
                if(winner.User == request.User)
                {
                    ///Cant win your own item
                }
                if (item.Uploader != request.User)
                {
                    ///throw exception trying to choose winner for another user
                }
                if(item.WinnerChosenRandomly)
                {
                    ///Throw exception winner should be chosen randomly
                }
                
                item.Redeemer = winner.User;
                item.IsSuspended = true;
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
