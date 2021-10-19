using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities
{
    public class Item : IEquatable<Item>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ItemCategories Category { get; set; }
        public string City { get; set; }
        [NotMapped]
        public List<IFormFile> PostedFiles { get; set; }
        [NotMapped]
        public List<String> ImageUrls { get; set; }
        public string Uploader { get; set; }
        public string Redeemer { get; set; }
        public bool Equals(Item other)
        {
            return (Name, Description, City) == (other.Name, other.Description, other.City);
        }
    }
}
