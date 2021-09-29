using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities.User
{
    public class User : IdentityUser
    {
        public String FullName { get; set; }
    }
}
