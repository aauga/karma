using Application.Users;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class UserController : BaseApiController
    {
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> onRegister()
        {
            var user = await GetUser();
            await Mediator.Send(new OnRegister.Command { User = user });
            return NoContent();
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult<List<PointContributor>>> GetUserContributions()
        {
            var user = await GetUser();
            Media
        }
    }
}
