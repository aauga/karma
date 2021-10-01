﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities.User
{
    public class RegisterModel
    {
        [Required]
        public String Username { get; set; }

        [Required]
        public String Fullname { get; set; }

        [Required]
        public String Password { get; set; }


    }
}
