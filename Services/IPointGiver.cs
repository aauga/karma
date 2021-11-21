using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IPointGiver
    {
        public  Task GivePoints(String user, int amount);
        public Task GivePointsOnRedemption(String user , Guid ItemId);
    }
}
