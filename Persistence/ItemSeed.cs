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
        public static async Task SeedData(ItemDbContext context)
        {
            if (context.Items.Any())
            {
                return;
            }
            
            var items = new List<Item>
            {
                new Item
                {
                    Name = "A white t-shirt",
                    Description = "A lovely white t-shirt with cats and dogs on it",
                },
                new Item
                {
                    Name = "2001 computer",
                    Description = "Old computer I do not need anymore",
                }
            };
            
            await context.Items.AddRangeAsync(items);
            await context.SaveChangesAsync();
        }
    }
}
