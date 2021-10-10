using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using System;

namespace WebApi.Controllers
{
    [Route("api/item")]
    public class ItemController : BaseApiController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost,Route("CreateItem")]
        public async Task<IActionResult> CreateItem([FromForm]Item item)
        {
            return Ok(await Mediator.Send(new Create.Command { Item = item }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item item)
        {
            item.Id = id;
            return base.Ok((object)await Mediator.Send(new Edit.Command { Item = item }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
