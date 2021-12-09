using Application.Coupons.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class CouponsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CouponResponse>>> GetCoupons()
        {
            var Coupons = await Mediator.Send(new GetCoupons.Query());

            return Ok(Coupons);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<string>> BuyCoupon([FromRoute] Guid CouponId)
        {
            var user = await GetUser();
            var code = await Mediator.Send(new BuyCoupon.Query {CouponId = CouponId , User = user });

            return Ok(code);
        }
    }
}
