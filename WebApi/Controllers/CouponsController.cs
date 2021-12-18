using Application.Coupons.Commands;
using Application.Coupons.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Coupons.Commands.RedeemCouponCommand;

namespace WebApi.Controllers
{
    public class CouponsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<object>> GetCoupons([FromQuery] uint page = 1, [FromQuery] uint itemsPerPage = 16)
        {
            return Ok(await Mediator.Send(new GetCoupons.Query {Page = page, ItemsPerPage = itemsPerPage}));
        }

        [Authorize]
        [HttpPost("redeem/{id}")]
        public async Task<ActionResult<string>> Redeem([FromRoute] Guid id)
        {
            var user = await GetUser();
            var couponCode = await Mediator.Send(new RedeemCouponCommand {CouponId = id, UserId = user });

            return Ok(couponCode);
        }

        [Authorize]
        [HttpPost("/admin/company/")]
        public async Task<IActionResult> AddCompany([FromBody] Company company)
        {
            var user = await GetUser();

            Mediator.Send(new AddCompany.Command { User = user , Company = company });

            return NoContent();
        }

        [Authorize]
        [HttpPost("/admin/coupon/")]
        public async Task<IActionResult> AddCoupons([FromBody] List<Coupon> coupons)
        {
            var user = await GetUser();

            Mediator.Send(new AddCoupons.Command { User = user ,  Coupons = coupons});

            return NoContent();
        }

        [Authorize]
        [HttpPost("/admin/code")]
        public async Task<IActionResult> AddCodes([FromBody] List<CouponCode> codes)
        {
            var user = await GetUser();

            Mediator.Send(new AddCodes.Command { User = user , Codes = codes });

            return NoContent();
        }

    }
}
