using Persistance;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Domain.Entities.User;

namespace Services
{
    public class AccessTokenGenerator
    {
      
        public static String GenerateAccessToken (User user)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("xNuW0Sel75tVucuUK0yQOOCzpEuisnYXX_C7Mea-un1MCCBA0Eq-XMJ5M5Db3M_e2y4n35mWCnQCcUmaQrzBnQTvzJI_um7SLbyEpC_xaD_iScGmg-i9hTfOOUcIDY7Dnpb80SRu9CPRiW3N7IRrJLGAjx4U6KBH_ry-ADb_kPs"));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>();
            Claim claim = new Claim("username", user.UserName);
            claims.Add(claim);
            JwtSecurityToken token = new JwtSecurityToken("https://localhost:44367", "https://localhost:44367", claims, DateTime.Now, DateTime.Now.AddHours(1), credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
