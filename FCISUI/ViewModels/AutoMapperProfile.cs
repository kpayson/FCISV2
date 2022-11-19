using AutoMapper;
using FCISUI.Models;
using FCISUI.ViewModels;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Gsfgrowth, GSFGrowthDelta>()
               .ForMember(
                    d => d.GoLiveDate,
                    opt => opt.MapFrom(src => new DateTime(src.Year, src.Month, 1)));

    }
}