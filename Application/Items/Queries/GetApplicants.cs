﻿using Application.Exceptions;
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

namespace Application.Items.Queries
{
    public class GetApplicants
    {
        public class Query : IRequest<IEnumerable<Applicant>>
        {
            public Guid ItemId { get; set; }
            public String User { get; set; }
        }
        public class Handler : IRequestHandler<Query, IEnumerable<Applicant>>
        {
            private readonly ItemDbContext _context;
            
            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Applicant>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.ItemId);
                if(item.Uploader != request.User)
                {
                    throw new ConflictException($"Item {request.ItemId} does not belong to the client");
                }
                var contributors = await _context.Applicants.Where(s => s.ListingId == request.ItemId).ToListAsync();

                return contributors;
            }
        }
    }
}
