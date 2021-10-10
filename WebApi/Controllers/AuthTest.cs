using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class AuthTest : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult Private()
        {
            return Ok("labas");
        }
    }
}
