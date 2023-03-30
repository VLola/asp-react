using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using Project_124.Models;
using Project_124.UnitOfWorks;
using System.Security.Claims;

namespace Project_124.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        UserWork work;
        public UserController()
        {
            work = new UserWork();
        }

        [HttpGet("SendText"), Authorize]
        public async Task<ActionResult> SendText(string text)
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId != null)
            {
                int id = Int32.Parse(claimId.Value);
                int count = await work.UserRepo.GetCountMessages(id);
                if (count < 50)
                {
                    OpenAIAPI api = new OpenAIAPI(new APIAuthentication("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", "org-QJVBWCJXr5P8ILTVhZU9h5tH"));
                    var result = await api.Completions.GetCompletion(text);

                    if (result != null)
                    {
                        Message message = new();
                        message.Question = text;
                        message.Response = result;
                        message.DateTime = DateTime.UtcNow;
                        message.UserId = id;
                        await work.UserRepo.AddMessage(message);

                        return Ok("Ok");
                    }
                    return BadRequest("Chat GPT request Exception");
                }
                else return BadRequest("Message limit reached");
            }
            else return NotFound("User not found");

        }
        [HttpGet("GetMessages"), Authorize]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId != null) return Ok(await work.UserRepo.GetMessages(Int32.Parse(claimId.Value)));
            else return NotFound();
        }
        [HttpGet("GetCountMessages"), Authorize]
        public async Task<ActionResult<int>> GetCountMessages(int id)
        {
            return await work.UserRepo.GetCountMessages(id);
        }
    }
}
