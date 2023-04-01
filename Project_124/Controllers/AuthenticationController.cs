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
        AuthenticationWork work;
        public AuthenticationController()
        {
            work = new AuthenticationWork();
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(DataUser dataUser)
        {
            if (!TryValidateModel(dataUser, nameof(DataUser))) return BadRequest("Model not validate");
            ModelState.ClearValidationState(nameof(DataUser));
            if (dataUser is null) return BadRequest("Invalid user request!!!");
            User? user = await work.Repository.CheckUser(dataUser);
            if (user != null)
            {
                // Claims
                List<Claim> claims = new();
                claims.Add(new Claim(ClaimTypes.PrimarySid, user.Id.ToString()));
                claims.Add(new Claim(ClaimTypes.Role, user.Role));

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse { Role = user.Role, Access = user.Access, Token = tokenString });
            }
            return Unauthorized("Wrong data!");
        }

        [HttpPost("registration")]
        public async Task<ActionResult> Add(DataUser dataUser)
        {
            if (!TryValidateModel(dataUser, nameof(DataUser))) return BadRequest("Model not validate");
            ModelState.ClearValidationState(nameof(DataUser));
            if (dataUser is null) return BadRequest("Invalid user request!!!");
            var addr = new System.Net.Mail.MailAddress(dataUser.Email);
            if (addr.Address == dataUser.Email)
            {
                if (await work.Repository.CheckEmail(dataUser)) return Conflict("User exist!");
                else
                {
                    int id = await work.Repository.Add(dataUser);
                    return Ok("Ok");
                }
            }
            else return BadRequest("Email not validate");
        }
    }
}
