using System.Security.Claims;
using api.DTOs;
using api.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
         public UserManager<AppUser> _userManager;
        public TokenService TokenService { get; }
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this.TokenService = tokenService;
            _userManager = userManager;
            
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

       

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
           
             if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email)) 
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            } 
            
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName)) 
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }


            var user = new AppUser {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded){
                 return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

         private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = TokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}