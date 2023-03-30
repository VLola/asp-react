using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using Project_124.Models;
using Project_124.UnitOfWorks;

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
        public async Task<ActionResult> SendText(string text, int id)
        {
            int count = await work.UserRepo.GetCountMessages(id);
            if (count < 50)
            {
                OpenAIAPI api = new OpenAIAPI(new APIAuthentication("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", "org-QJVBWCJXr5P8ILTVhZU9h5tH"));
                var result = await api.Completions.GetCompletion(text);

                Message message = new();
                message.Question = text;
                message.Response = result;
                message.DateTime = DateTime.UtcNow;
                message.UserId = id;
                await work.UserRepo.AddMessage(message);

                return Ok("Ok");
            }
            else return BadRequest("Message limit reached");
        }
        [HttpGet("GetMessages"), Authorize]
        public async Task<ActionResult<List<Message>>> GetMessages(int id)
        {
            return await work.UserRepo.GetMessages(id);
        }
        [HttpGet("GetCountMessages"), Authorize]
        public async Task<ActionResult<int>> GetCountMessages(int id)
        {
            return await work.UserRepo.GetCountMessages(id);
        }
    }
}
