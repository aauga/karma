using Persistance;
using Domain.Entities.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Services;

namespace Karma.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;


        public AuthenticateController(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            config = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register ([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var userExists = await userManager.FindByNameAsync(model.username);
                if (userExists != null)
                {
                    return BadRequest();
                }
                else
                {
                    User user = new User() { UserName = model.username };
                    var result = await userManager.CreateAsync(user, model.password);
                    if (result.Succeeded)
                    {
                        return Ok();
                    }
                    else
                    {
                        return StatusCode(500, "Internal Server Error. Something went Wrong!");
                    }
                }
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LogInModel model)
        {
            if(ModelState.IsValid)
            {
                var user = await userManager.FindByNameAsync(model.username);
                if (user != null && await userManager.CheckPasswordAsync(user, model.password))
                {
                    String usersToken = AccessTokenGenerator.GenerateAccessToken(user);
                    return Ok(usersToken);
                }
                else
                {
                    return Unauthorized();
                }
            }   
            else
            {
                return BadRequest();
            }

            
        }
        //Auth0

    }
}
