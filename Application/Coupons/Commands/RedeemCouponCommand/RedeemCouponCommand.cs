using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Coupons.Commands.RedeemCouponCommand
{
    public class RedeemCouponCommand : IRequest<CouponCode>
    {
        public Guid CouponId { get; set; }
        public string UserId { get; set; }
    }

    public class Handler : IRequestHandler<RedeemCouponCommand, CouponCode>
    {
        private readonly ItemDbContext _context;
        
        public Handler(ItemDbContext context)
        {
            _context = context;
        }

        public async Task<CouponCode> Handle(RedeemCouponCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(User), request.UserId);
            }
            
            var coupon = await _context.Coupons.FindAsync(request.CouponId);

            if (coupon == null)
            {
                throw new NotFoundException(nameof(Coupon), request.CouponId);
            }
            
            if (user.Points < coupon.Price)
            {
                throw new BadRequestException($"Not enough balance to redeem coupon {request.CouponId}.");
            }
            
            var couponCode = await _context.CouponCodes.Where(x => x.CouponId == request.CouponId).FirstOrDefaultAsync();

            if (couponCode == null)
            {
                throw new NotFoundException($"No coupon codes with key {request.CouponId} were found.");
            }
            
            user.Points -= coupon.Price;
            
            _context.CouponCodes.Remove(couponCode);

            await _context.SaveChangesAsync();

            return couponCode;
        }
    }
}