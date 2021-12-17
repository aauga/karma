using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Redeem.Commands.CreateReason
{
    public class CreateReasonCommand : IRequest<ItemApplication>
    {
        public string UserId { get; set; }
        public Guid ItemId { get; set; }
        public Applicant Applicant { get; set; }
    }

    public class Handler : IRequestHandler<CreateReasonCommand, ItemApplication>
    {
            private readonly ItemDbContext _context;

            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<ItemApplication> Handle(CreateReasonCommand request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.ItemId);
                var user = await _context.Users.FindAsync(request.UserId);
                
                if(item == null)
                {
                    throw new NotFoundException(nameof(Item), request.ItemId); 
                }

                if (item.IsSuspended)
                {
                    throw new ConflictException("You can not apply for a suspended item.");
                }
                
                if(user == null)
                {
                    throw new NotFoundException(nameof(User), request.UserId); 
                }

                if (item.Uploader == user.Username)
                {
                    throw new ConflictException("You can not apply for your own item.");
                }

                request.Applicant.UserId = request.UserId;
                request.Applicant.User = user;
                request.Applicant.ItemId = request.ItemId;
                request.Applicant.Item = item;

                if (item.Applicants == null)
                {
                    item.Applicants = new List<Applicant>();
                }
                
                if (user.Applications == null)
                {
                    user.Applications = new List<Applicant>();
                }
                
                item.Applicants.Add(request.Applicant);
                user.Applications.Add(request.Applicant);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException e)
                {
                    throw new UnknownException(e.Message);
                }

                return new ItemApplication {Reason = request.Applicant.Reason};
            }
    }
}