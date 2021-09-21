using System.Collections.Generic;
using System.Threading.Tasks;
using karma.Data;
using karma.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace karma.Controllers
{
    [ApiController]
    [Route("/api/items")]
    public class ItemController : ControllerBase
    {
        private readonly IDataAccess _data;
        private readonly IConfiguration _config;

        public ItemController(IDataAccess data, IConfiguration config)
        {
            _data = data;
            _config = config;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            string sql = "SELECT * FROM item_list";
            List<ItemModel> items = await _data.LoadData<ItemModel, dynamic>(sql, new {}, _config.GetConnectionString("default"));

            return Ok(items);
        }
    }
}