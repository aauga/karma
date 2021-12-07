using Domain.Entities;
using Microsoft.EntityFrameworkCore;
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

        public async Task ChooseWinnerRandomly(Guid ItemId)
        {
            var rand = new Random();
            var contributors = await _context.Applicants.Where(s => s.ListingId == ItemId).ToListAsync();
            int winnerIndex = rand.Next(0, contributors.Count-1);
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
