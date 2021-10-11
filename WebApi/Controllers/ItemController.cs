using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using System;
using System.Threading;

namespace WebApi.Controllers
{
    public class ItemController : BaseApiController
    {
        [HttpGet]
        /*public async Task<IActionResult> GetItems(CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new List.Query(), cancellationToken));
        }*/
        public async Task<IActionResult> GetItems()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(Item item)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Item = item }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item item)
        {
            item.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Item = item }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
