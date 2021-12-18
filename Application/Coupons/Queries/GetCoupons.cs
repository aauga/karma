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

namespace Application.Coupons.Queries
{
    public class GetCoupons
    {
        public class Query : IRequest<object>
        {
            public uint Page { get; set; }
            public uint ItemsPerPage { get; set; }
        }
        public class Handler : IRequestHandler<Query, object>
        {
            private readonly ItemDbContext _context;
            public Handler(ItemDbContext context)
            {
                _context = context;
            }

            public Task<object> Handle(Query request, CancellationToken cancellationToken)
            {
                var coupons = _context.Coupons
                    .Where(x => _context.CouponCodes.Any(y => x.Id == y.CouponId))
                    .OrderByDescending(x => x.Uploaded)
                    .Skip((int) ((request.Page - 1) * request.ItemsPerPage))
                    .Take((int) request.ItemsPerPage)
                    .Join(
                        _context.Companies,
                        coupon => coupon.CompanyId,
                        company => company.Id,
                        (coupon, company) => new CouponResponse
                        {
                            CompanyName = company.Name,
                            LogoUrl = company.LogoUrl,
                            Description = coupon.Description,
                            Price = coupon.Price,
                            CouponName = coupon.Name,
                            CouponId = coupon.Id,
                            Uploaded = coupon.Uploaded,
                            Amount = _context.CouponCodes.Count(x => x.CouponId == coupon.Id)
                        }
                    );
                
                var totalItems = _context.Coupons.Count();
                var totalPages = (int) Math.Ceiling((float) totalItems / request.ItemsPerPage);
                
                Object pagination = new
                    {TotalPages = totalPages, request.Page, request.ItemsPerPage};

                return Task.FromResult<object>(new {Pagination = pagination, Coupons = coupons});
            }
        }
    }
}
