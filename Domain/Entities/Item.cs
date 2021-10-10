<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
=======
﻿using System;
>>>>>>> a8eefecf2aab530e2e22e99145487eecec8a4bd5

namespace Domain.Entities
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [NotMapped]
        public List<IFormFile> PostedFiles { get; set; }
    }
}
