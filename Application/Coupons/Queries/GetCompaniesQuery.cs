using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Coupons.Queries
{
    public class GetCompaniesQuery : IRequest<IEnumerable<Company>>
    {
        
    }

    public class Handler : IRequestHandler<GetCompaniesQuery, IEnumerable<Company>>
    {
        private readonly ItemDbContext _context;
        
        public Handler(ItemDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<Company>> Handle(GetCompaniesQuery request, CancellationToken cancellationToken)
        {
            var companies = _context.Companies.Where(company =>
                _context.Coupons.Any(coupon => coupon.CompanyId == company.Id &&
                    _context.CouponCodes.Any(couponCode => couponCode.CouponId == coupon.Id)));

            return Task.FromResult<IEnumerable<Company>>(companies);
        }
    }
}