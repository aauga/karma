using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PointContributor
    {
        [Key]
        [ForeignKey("User")]
        public string User { get; set; }
        [ForeignKey("Item")]
        public guid ListingId { get; set; }
        public int AmountOfPoints { get; set; }
        public string Reasoning { get; set; }

    }
}
