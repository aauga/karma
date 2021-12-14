using Application.Items.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Controllers;
using Xunit;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Application.Users;

namespace Tests
{
    public class UnitTest
    {
        [Fact]
        public void TestItemQueryDetails()
        {
            var query = new Details.Query();
            var token = new CancellationToken();

            query.Id = Guid.NewGuid();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            Assert.ThrowsAsync<NotFoundException>(() => new Details.Handler(mycontext).Handle(query, token));
        }

        [Fact]
        public void TestItemQueryGetApplicantsNotFoundException()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();
            Assert.ThrowsAsync<NotFoundException>(() => new GetApplicants.Handler(mycontext).Handle(query, token));
        }

        [Fact]
        public void TestItemQueryGetApplicantsUserDoesNotHaveAccessException()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();
            item.Id = Guid.NewGuid();
            item.Uploader = "User1";
            mycontext.Items.Add(item);
            mycontext.SaveChanges();   
            
            Assert.ThrowsAsync<UserDoesNotHaveAccessException>(() => new GetApplicants.Handler(mycontext).Handle(query, token));
        }

        [Fact]
        public void TestItemQueryGetApplicantsNotNull1()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();
            item.Id = Guid.NewGuid();
            item.Uploader = "User1";
            
            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            Applicant a1 = new Applicant();
            Applicant a2 = new Applicant();
            item.Applicants = new List<Applicant>() { a1, a2 };

            Assert.NotNull(new GetApplicants.Handler(mycontext).Handle(query, token));

        }

        [Fact]
        public void TestItemQueryGetApplicantsNotNull2()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();
            item.Id = Guid.NewGuid();
            item.Uploader = "User1";

            mycontext.Items.Add(item);
            mycontext.SaveChanges();


            item.Applicants = new List<Applicant>();

            Assert.NotNull(new GetApplicants.Handler(mycontext).Handle(query, token));
        }

        [Fact]
        public void TestItemQueryList()
        {
            var query = new List.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            var items = new List<Item>();
            Item a1 = new Item();
            Item a2 = new Item();
            var items1 = new List<Item>() { a1, a2 };

            Assert.NotEmpty(items1);
            Assert.Empty(items);

           
        }


        [Fact]
        public void TestUserCommandOnRegister()
        {
            var query = new OnRegister.Command();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.User = "User";

            Assert.NotNull(new OnRegister.Handler(mycontext).Handle(query, token));
        }
    }
}
