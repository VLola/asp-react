using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project_124.Models;
using Project_124.UnitOfWorks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project_124.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        UserWork work;
        public AuthenticationController()
        {
            work = new UserWork();
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(DataUser dataUser)
        {
            if (!TryValidateModel(dataUser, nameof(DataUser)))
                return BadRequest();
            ModelState.ClearValidationState(nameof(DataUser));
            if (dataUser is null) return BadRequest("Invalid user request!!!");
            User? user = await work.UserRepo.CheckUser(dataUser);
            if (user != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse { Id = user.Id, Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPost("registration")]
        public async Task<ActionResult> Add(DataUser dataUser)
        {
            if (!TryValidateModel(dataUser, nameof(DataUser))) return BadRequest();
            ModelState.ClearValidationState(nameof(DataUser));
            var addr = new System.Net.Mail.MailAddress(dataUser.Email);
            if (addr.Address == dataUser.Email)
            {
                if (await work.UserRepo.CheckEmail(dataUser)) return Conflict();
                else
                {
                    int id = await work.UserRepo.Add(dataUser);
                    string uri = $"/registration/{id}";
                    return Created(uri, dataUser);
                }
            }
            else return BadRequest();
        }
    }
}
