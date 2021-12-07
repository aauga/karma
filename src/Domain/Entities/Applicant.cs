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
        public string User { get; set; }
        [ForeignKey("Item")]
        public Guid ListingId { get; set; }
        public string Reasoning { get; set; }

    }
}
