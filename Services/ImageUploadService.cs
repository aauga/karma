using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    class ImageUploadService
    {
        public Cloudinary _cloudinary;
        public ImageUploadService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public List<String> UploadImages(List<IFormFile> images)
        {
            List<String> urls = new List<string>();

            foreach (IFormFile image in images)
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.Name, image.OpenReadStream())
                };
                var uploadResult = _cloudinary.Upload(uploadParams);
                urls.Add(uploadResult.ToString());
            }

            return urls;
        }





    }
}
