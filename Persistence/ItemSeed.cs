using Domain.Entities;
using Persistance;
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
                    Name = "A white t-shirt",
                    Description = "A lovely white t-shirt with cats and dogs on it",
                },
                new Item
                {
                    Name = "2001 computer",
                    Description = "Old computer I do not need anymore",
                },
                new Item
                {
                    Name = "T-Shirt with dragons",
                    Description = "Became too small for me, so giving it away",
                },
                new Item
                {
                    Name = "Comfortable sofa",
                    Description = "Cant fit it in my room, I'll give it to you for a cup of coffee",
                }
                
             };
            await Context.Items.AddRangeAsync(items);
            await Context.SaveChangesAsync();
        }
    }
}
