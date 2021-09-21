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
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            string sql = "SELECT * FROM item_list WHERE id = ?";
            List<ItemModel> item = await _data.LoadData<ItemModel, dynamic>(sql, new { id }, _config.GetConnectionString("default"));

            if (item.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(item[0]);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemModel item)
        {
            string sql = "INSERT INTO item_list (name, description) VALUES (?, ?)";
            await _data.SaveData(sql, new { item.Name, item.Description }, _config.GetConnectionString("default"));

            return Ok("Successfully created item.");
        }
    }
}