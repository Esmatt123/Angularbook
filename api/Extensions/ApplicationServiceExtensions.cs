using Application.Books;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace api.Extensions
{
    public static class ApplicationServiceExtensions
    {
         public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            services.AddEndpointsApiExplorer();
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:5010");
            });
            });

           services.AddMediatR(typeof(List.Handler)); //This will register all of our handlers, as well as adding our mediator pattern as a service
           services.AddAutoMapper(typeof(MappingProfiles).Assembly); //Adds the service and uses the assembly to call all the mapping profiles
           services.AddFluentValidationAutoValidation();
           services.AddValidatorsFromAssemblyContaining<Create>();
           services.AddHttpContextAccessor();
           services.AddScoped<IUserAccessor, UserAccessor>();
            return services;
        }
    }
}