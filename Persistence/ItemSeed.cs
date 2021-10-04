using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class ItemSeed
    {
        public static async Task SeedData(ItemDbContext Context)
        {
            if (Context.Items.Any())
            {
                return;
            }
            var items = new List<Item>
            {
                new Item
                {
                    Id = 5,
                    Name = "Jonas",
                    Description = "Mokslininkas",
                },
                
             };
            await Context.Items.AddRangeAsync(items);
            await Context.SaveChangesAsync();
        }
    }
}
