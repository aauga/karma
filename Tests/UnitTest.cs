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
using FluentAssertions;

namespace Tests
{
    public class UnitTest
    {

        [Fact]
        public void Test_Item_Query_Details()
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

            Func<Task> task = async () => await new Details.Handler(mycontext).Handle(query, token);
            task.Should().ThrowAsync<NotFoundException>().Wait();
        }

        [Fact]
        public void Test_Item_Query_GetApplicants_NotFoundException()
        {
            var query = new GetApplicants.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            Func<Task> task = async () => await new GetApplicants.Handler(mycontext).Handle(query, token);
            task.Should().ThrowAsync<NotFoundException>().Wait();
        }

        [Fact]
        public void Test_Item_Query_GetApplicants_UserDoesNotHaveAccessException()
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

            Func<Task> task = async () => await new GetApplicants.Handler(mycontext).Handle(query, token);
            task.Should().ThrowAsync<UserDoesNotHaveAccessException>().Wait();
        }

        [Fact]
        public void Test_Item_Query_GetApplicants()
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
            a1.UserId = "User 2";
            Applicant a2 = new Applicant();
            a2.UserId = "User 3";

            item.Applicants = new List<Applicant>() { a1, a2 };
            item.Id = query.ItemId;
            item.Uploader = "User";

            mycontext.Items.Add(item);
            mycontext.SaveChanges();

            var task = new GetApplicants.Handler(mycontext).Handle(query, token);
            task.Wait();

            task.Result.Should().NotBeNull();
        }

        [Fact]
        public void Test_Item_Query_GetApplicants_Empty()
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

            task.Result.Should().BeNull();
        }

        [Fact]
        public void Test_Item_Query_List()
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

            task.Result.Should().BeEquivalentTo(items);
        }

        [Fact]
        public void Test_User_Command_OnRegister()
        {
            var query = new OnRegister.Command();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            var task = new OnRegister.Handler(mycontext).Handle(query, token);
            task.Wait();

            task.Result.Should().Be(Unit.Value);
        }

        [Fact]
        public void Test_User_Query_GetUserApplications()
        {
            var query = new GetUserApplications.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            var task = new GetUserApplications.Handler(mycontext).Handle(query, token);
            task.Wait();

            task.Result.Should().BeNull();
        }

        [Fact]
        public void Test_User_Query_GetUserMetadata()
        {
            var query = new GetUserMetadata.Query();
            var token = new CancellationToken();

            var builder = new DbContextOptionsBuilder<ItemDbContext>().UseInMemoryDatabase("db");
            var mycontext = new ItemDbContext(builder.Options);
            mycontext.Database.EnsureDeleted();

            query.User = "User";

            User a1 = new User();
            a1.AuthId = query.User;

            mycontext.Add(a1);
            mycontext.SaveChanges();

            var task = new GetUserMetadata.Handler(mycontext).Handle(query, token);
            task.Wait();

            task.Result.AuthId.Should().BeEquivalentTo(query.User);
        }
    }
}
