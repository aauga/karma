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
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;


        public AuthenticationController(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _config = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register ([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var userExists = await _userManager.FindByNameAsync(model.Username);
                if (userExists != null)
                {
                    return BadRequest();
                }
                else
                {
                    User user = new User() { UserName = model.Username };
                    var result = await _userManager.CreateAsync(user, model.Password);
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
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
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
