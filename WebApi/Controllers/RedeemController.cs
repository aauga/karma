using System;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Redeem.Commands;
using Application.Redeem.Commands.CreateReason;
using Application.Redeem.Commands.UpdateReason;
using Application.Redeem.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class RedeemController : BaseApiController
    {
        [Authorize]
        [HttpPost("{id}")]
        public async Task<ActionResult<ItemApplication>> Create([FromRoute] Guid id, [FromBody] Applicant applicant)
        {
            var user = await GetUser();
            var res = await Mediator.Send(new CreateReasonCommand { UserId = user, ItemId = id, Applicant = applicant });
            
            return CreatedAtAction(nameof(Create), res);
        }
        
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemApplication>> Read([FromRoute] Guid id)
        {
            var user = await GetUser();
            
            return await Mediator.Send(new GetReasonQuery { UserId = user, ItemId = id });
        }
        
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<ItemApplication>> Update([FromRoute] Guid id, [FromBody] Applicant applicant)
        {
            var user = await GetUser();
            
            await Mediator.Send(new UpdateReasonCommand { UserId = user, ItemId = id, Applicant = applicant });
            
            return NoContent();
        }
        
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var user = await GetUser();
            
            await Mediator.Send(new DeleteReasonCommand { UserId = user, ItemId = id });
            
            return NoContent();
        }
    }
}