using System;

namespace Domain.Entities
{
    public class Applicant
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
        public string Reason { get; set; }
    }
}