﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class ItemDbContext : DbContext
    {
        public ItemDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Item> Items { get; set; }
    }
}