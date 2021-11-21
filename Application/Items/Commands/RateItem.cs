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
    public class RateItem
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string User { get; set; }
            public Rating Rating { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ItemDbContext _context;
            private readonly PointGiver _pointGiver;

            public Handler(ItemDbContext context , PointGiver pointGiver)
            {
                _context = context;
                _pointGiver = pointGiver;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);
                var user = await _context.Users.FindAsync(request.User);

                if (item == null)
                {
                    ///throw exception
                }
                if (user == null)
                {
                    ///throw exception
                }

                request.Rating.ItemId = item.Id;
                request.Rating.User = user.Username;
                await _context.Ratings.AddAsync(request.Rating);
                await _context.SaveChangesAsync();

                await _pointGiver.GivePoints(user.Username, 1);

                return Unit.Value;
            }
        }
    }
}
