using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Applicant
    {
        [Key]
        [ForeignKey("User")]
        [Column(Order = 1)]
        public string User { get; set; }
        [Key]
        [ForeignKey("Item")]
        [Column(Order = 2)]
        public Guid Item { get; set; }
        public string Reason { get; set; }
    }
}
