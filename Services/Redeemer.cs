using Domain.Entities;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class Redeemer
    {
        private readonly ItemDbContext _context;
        
        public Redeemer(ItemDbContext context)
        {
            _context = context;
        }

        public async Task StartSelection(Guid itemId)
        {
            var item = await _context.Items
                .Include(x => x.Applicants)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == itemId);

            if (item != null || item.Redeemer != null)
            {
                var applicants = item.Applicants.Where(x => !x.IsSuspended).ToList();

                if (!applicants.Any())
                {
                    ExtendOrSuspend(item);
                }
                else
                {
                    PickWinner(item, applicants);
                }
            
                await _context.SaveChangesAsync();
            }
        }

        public void ExtendOrSuspend(Item item)
        {
            if (item.WinnerChosenRandomly)
            {
                item.ExpirationDate = DateTime.Now.AddMinutes(30);
                BackgroundJob.Schedule(() => StartSelection(item.Id), TimeSpan.FromMinutes(30));
            }
            else
            {
                item.IsSuspended = true;
            }
        }

        public void PickWinner(Item item, List<Applicant> applicants)
        {
            var rand = new Random();
            var winnerIndex = rand.Next(0, applicants.Count);
            
            var winner = applicants.ElementAt(winnerIndex);
            item.Redeemer = winner.User.Username;
            
            item.IsSuspended = true;
        }
    }
}