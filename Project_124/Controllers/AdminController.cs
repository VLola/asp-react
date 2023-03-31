using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project_124.Models;
using Project_124.UnitOfWorks;
using System.Security.Claims;

namespace Project_124.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        AdminWork work;
        public AdminController()
        {
            work = new AdminWork();
        }
        [HttpGet("GetUsers"), Authorize]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            Claim? claimRole = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);
            if (claimRole != null)
            {
                if (claimRole.Value == "Admin")
                {
                    return Ok(work.Repository.GetUsers());
                }
                else return BadRequest("No access");
            }
            else return NotFound("User not found");
        }
    }
}
