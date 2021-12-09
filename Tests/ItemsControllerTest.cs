using Domain.Entities;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using WebApi.Controllers;
using Xunit;
using System.Net.Http;

namespace IntegrationTests
{
    public class ItemsControllerTest : IntegrationTest
    {
        [Fact]
        public async Task Test_Get_All()
        {
            await AuthenticateClient();

            var response = await Client.GetAsync("/api/items/");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Content.Should().NotBeNull();
        }

        [Fact]
        public async Task Test_Get_Contributors()
        {
            await AuthenticateClient();

            var response = await Client.GetAsync("/api/items/contributors/8e8b25bd-7ca4-44c8-3e8d-08d9b99bacbd");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Content.Should().NotBeNull();
        }

        [Fact]
        public async Task Test_Get_SpecificItem()
        {
            await AuthenticateClient();

            var response = await Client.GetAsync("/api/items/8e8b25bd-7ca4-44c8-3e8d-08d9b99bacbd");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Content.Should().NotBeNull();
        }


        [Fact]
        public async Task Test_Post_CreateItem()
        {
            await AuthenticateClient();
            Item TestItem = new Item
            {
                Name = "TEST",
                Description = "DESC",
                ExpirationDate = new DateTime(2022,01,01)
            };

            var response = await Client.PostAsJsonAsync("/api/items/" , TestItem);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Post_ChooseWinner()
        {
            await AuthenticateClient();
            Guid WinnerId = new Guid("00000000-0000-0000-0000-000000000000");

            var response = await Client.PostAsJsonAsync("/api/items/winner/8e8b25bd-7ca4-44c8-3e8d-08d9b99bacbd", WinnerId);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Post_RateItem()
        {
            await AuthenticateClient();
            Rating TestRating = new Rating
            {
                PriceRating = 10,
                QualityRating = 10
            };

            var response = await Client.PostAsJsonAsync("/api/items/rate/af4a6b2e-2a59-4879-86ac-68ece830f1a4", TestRating);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Post_ApplyForItem()
        {
            await AuthenticateClient();

            var response = await Client.PostAsync("/api/items/apply/b3ff1c3d-9b09-42fc-dcab-08d9b9a1896e", null);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Put_EditItem()
        {
            await AuthenticateClient();
            var TestItem = new Item
            {
                Name = "nebe telikas"
            };

            var response = await Client.PutAsJsonAsync("/api/items/8e8b25bd-7ca4-44c8-3e8d-08d9b99bacbd" , TestItem);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Put_UnsuspendItem()
        {
            await AuthenticateClient();

            var response = await Client.PatchAsync("/api/items/unsuspend/b9808fca-b413-44b8-af6d-08d9b99bc450" , null);

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Fact]
        public async Task Test_Delete_DeleteItem()
        {
            await AuthenticateClient();

            var response = await Client.DeleteAsync("/api/items/b9808fca-b413-44b8-af6d-08d9b99bc450");

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

    }
}
