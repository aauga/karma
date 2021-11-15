using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PointContributor
    {
        public User User { get; set; }
        public int AmountOfPoints { get; set; }
        public string Reasoning { get; set; }

    }
}
