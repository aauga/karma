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

            public Handler(ItemDbContext context, IImageUpload imageUpload, Redeemer winnerPicker)
            { 
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.ItemId);
                var winner = await _context.Contributors.FindAsync(request.Winner.User);
                if(item.Uploader != request.User)
                {
                    ///throw exception trying to choose winner for another user
                }
                if(item.WinnerChosenRandomly)
                {
                    ///Throw exception winner should be chosen randomly
                }
                if(!request.Winner.Equals(winner))
                {
                    ///Throw exception such contributor doesnt exist
                }
                item.Redeemer = winner.User;
                item.IsSuspended = true;
                ///Terminate suspension  task

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
