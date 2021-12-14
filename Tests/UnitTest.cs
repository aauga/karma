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
using Services;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Application.Users;
using MediatR;

namespace Tests
{
    public class UnitTest
    {

        [Fact]
        public void TestItemQueryDetails()
        {
            var query = new Details.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.Id = Guid.NewGuid();

            var item = new Item();

            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            Assert.ThrowsAsync<NotFoundException>(() => new Details.Handler(mycontext).Handle(query, token)).Wait();
        }

        [Fact]
        public void TestItemQueryGetApplicants1()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            Assert.ThrowsAsync<NotFoundException>(() => new GetApplicants.Handler(mycontext).Handle(query, token)).Wait();
        }

        [Fact]
        public void TestItemQueryGetApplicants2()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();
            item.Id = query.ItemId;
            item.Uploader = "User1";
            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            Assert.ThrowsAsync<UserDoesNotHaveAccessException>(() => new GetApplicants.Handler(mycontext).Handle(query, token)).Wait();
        }

        [Fact]
        public void TestItemQueryGetApplicants3()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();

            Applicant a1 = new Applicant();
            Applicant a2 = new Applicant();
            item.Applicants = new List<Applicant>() { a1, a2 };

            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            var task = new GetApplicants.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.Equal(item.Applicants, task.Result);
        }

        [Fact]
        public void TestItemQueryGetApplicants4()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.ItemId = Guid.NewGuid();
            query.User = "User";

            var item = new Item();
            item.Id = query.ItemId;
            item.Uploader = "User";
            item.Applicants = new List<Applicant>() { };

            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            var task = new GetApplicants.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.Null(task.Result);
        }

        [Fact]
        public void TestItemQueryList()
        {
            var query = new List.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            Item a1 = new Item();
            Item a2 = new Item();
            var items = new List<Item>() { a1, a2 };

            mycontext.Add(a1);
            mycontext.Add(a2);
            mycontext.SaveChanges();

            var task = new List.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.Equal(items, task.Result);
        }

        [Fact]
        public void TestUserCommandOnRegister()
        {
            var query = new OnRegister.Command();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            var task = new OnRegister.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.IsType<Unit>(task.Result);
        }

        [Fact]
        public void TestUserQueryGetUserApplications()
        {
            var query = new GetUserApplications.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            var task = new GetUserApplications.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.Null(task.Result);
        }

        [Fact]
        public void TestUserQueryGetUserMetadata()
        {
            var query = new GetUserMetadata.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.User = "User";

            User a1 = new User();

            mycontext.Add(a1);
            mycontext.SaveChanges();

            var task = new GetUserMetadata.Handler(mycontext).Handle(query, token);
            task.Wait();

            Assert.Equal(query.User, task.Result.Username);
        }
    }
}
