using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities.User
{
    public class RegisterModel
    {
        [Required]
        [StringLength(30, ErrorMessage = "UserName doesnt match format", MinimumLength = 5)]
        public String username { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Name and surename dont match format", MinimumLength = 5)]
        public String fullname { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Password doesnt match format", MinimumLength = 3)]
        //[DataType(DataType.Password)]
        public String password { get; set; }


    }
}
