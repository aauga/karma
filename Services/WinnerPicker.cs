using Domain.Entities;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class WinnerPicker
    {
        private readonly ItemDbContext _context;
        public async Task ChooseWinner(Guid ItemId)
        {
            var rand = new Random();
            List<PointContributor> contributors = _context.Contributors.Where(s => s.ListingId == ItemId).ToList();
            int winnerIndex = rand.Next(0, contributors.Count);
            var item = await _context.Items.FindAsync(ItemId);
            item.Redeemer = contributors[winnerIndex].User;
            await _context.SaveChangesAsync();
        }
    }
}
