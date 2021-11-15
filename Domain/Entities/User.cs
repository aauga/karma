using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        public string Username { get; set; }
        public int KarmaPoints { get; set; }
        public List<Item> Listings { get; set; }
        public List<PointContributor> Contributions { get; set; }
        public bool isVerified { get; set; }

    }
}
