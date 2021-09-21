using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace karma.DbModels
{
    public class karmaDbContext:DbContext
    {
        public karmaDbContext(DbContextOptions<karmaDbContext> options):base (options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
