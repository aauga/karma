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
    public class ContributePoints
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string User { get; set; }
            public int Amount { get; set; }
            public string Reasoning { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ItemDbContext _context;

            public Handler(ItemDbContext context, IImageUpload imageUpload)
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
                if(user.KarmaPoints < request.Amount)
                {
                    ///Not enough points
                }
                await _context.Contributors.AddAsync(new PointContributor{ User = user.Username , AmountOfPoints = request.Amount , Reasoning = request.Reasoning);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
