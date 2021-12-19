using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Listings.Queries.GetApplicationsQuery
{
    public class GetApplicationsQuery : IRequest<IEnumerable<ApplicationModel>>
    {
        public Guid ItemId { get; set; }
        public string UserId { get; set; }
    }

    public class Handler : IRequestHandler<GetApplicationsQuery, IEnumerable<ApplicationModel>>
    {
        private readonly ItemDbContext _context;

        public Handler(ItemDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<ApplicationModel>> Handle(GetApplicationsQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User), request.UserId);
            }

            var item = await _context.Items
                .Where(item => item.Id == request.ItemId)
                .Include(item => item.Applicants)
                .FirstOrDefaultAsync(cancellationToken);

            if (item == null)
            {
                throw new NotFoundException(nameof(Item), request.ItemId);
            }

            var list = new List<ApplicationModel>();

            foreach (var applicant in item.Applicants)
            {
                var applicantData = _context.Users.First(x => x.AuthId == applicant.UserId);
                list.Add(new ApplicationModel {Username = applicantData.Username, Reason = applicant.Reason, IsSuspended = false});
            }

            return list;
        }
    }
}