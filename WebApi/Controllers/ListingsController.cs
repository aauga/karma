using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Coupons.Queries;
using Application.Listings.Commands.ChangeSuspensionStatusCommand;
using Application.Listings.Commands.SelectWinnerCommand;
using Application.Listings.Queries;
using Application.Listings.Queries.GetActiveListingsQuery;
using Application.Listings.Queries.GetApplicationsQuery;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class ListingsController : BaseApiController
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetActiveListings()
        {
            var user = await GetUser();
            var listings = await Mediator.Send(new GetActiveListingsQuery {UserId = user});

            if (!listings.Any())
            {
                return NoContent();
            }
            
            return Ok(listings);
        }
        
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationModel>>> GetApplications([FromRoute] Guid id)
        {
            var user = await GetUser();
            var applications = await Mediator.Send(new GetApplicationsQuery {ItemId = id, UserId = user});

            if (!applications.Any())
            {
                return NoContent();
            }
            
            return Ok(applications);
        }
        
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeSuspensionStatus([FromRoute] Guid id, [FromQuery] string username)
        {
            var user = await GetUser();
            
            await Mediator.Send(new ChangeSuspensionStatusCommand {ItemId = id, UserId = user, Applicant = username});

            return NoContent();
        }
        
        [Authorize]
        [HttpPost("{id}")]
        public async Task<IActionResult> SelectWinner([FromRoute] Guid id, [FromQuery] string username)
        {
            var user = await GetUser();
            
            await Mediator.Send(new SelectWinnerCommand {ItemId = id, UserId = user, Applicant = username});

            return NoContent();
        }
    }
}