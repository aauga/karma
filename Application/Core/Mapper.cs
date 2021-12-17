using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Item, Item>().ForAllMembers(o => o.Condition((source, destination, member) => member != null));
            CreateMap<Applicant, Applicant>().ForAllMembers(o => o.Condition((source, destination, member) => member != null));
        }
    }
}