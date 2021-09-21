using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace karma.DbModels
{
    public class User
    {
        [Key]
        public String userName { get; set;}
        public String passWord { get; set;}
    }
}
