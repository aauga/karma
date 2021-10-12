using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Items.Commands;
using Application.Items.Queries;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    public class ItemController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await Mediator.Send(new List.Query());

            if (items.Any() == false)
            {
                return NoContent();
            }

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            return Ok(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] Item item)
        {
            var user = await GetUser();
            
            await Mediator.Send(new Create.Command { Item = item, User = user });

            // check how to implement Created()
            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item item)
        {
            var user = await GetUser();
            
            await Mediator.Send(new Edit.Command { Id = id, Item = item, User = user });
            
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var user = await GetUser();
            
            await Mediator.Send(new Delete.Command { Id = id, User = user });
            
            return NoContent();
        }

        [Authorize]
        [HttpPost("redeem/{id}")]
        public async Task<IActionResult> RedeemItem(Guid id)
        {
            var user = await GetUser();

            await Mediator.Send(new Redeem.Command {Id = id, User = user});
            
            return NoContent();
        }
    }
}
