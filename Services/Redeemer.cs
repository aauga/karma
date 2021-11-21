using Domain.Entities;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class Redeemer
    {
        private readonly ItemDbContext _context;
        private readonly PointGiver _pointGiver;

        public Redeemer(ItemDbContext context , PointGiver pointGiver)
        {
            _context = context;
        }

        public async Task ChooseWinner(Guid ItemId)
        {
            var rand = new Random();
            List<Applicant> contributors = _context.Applicants.Where(s => s.ListingId == ItemId).ToList();
            int winnerIndex = rand.Next(0, contributors.Count);
            var item = await _context.Items.FindAsync(ItemId);
            item.Redeemer = contributors[winnerIndex].User;
            await _context.SaveChangesAsync();
        }

        public async Task SuspendItem(Guid ItemId)
        {
            var item = await _context.Items.FindAsync(ItemId);
            item.IsSuspended = true;
            await _context.SaveChangesAsync();
        }
        
    }
}
