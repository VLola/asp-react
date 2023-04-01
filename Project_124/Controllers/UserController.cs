using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if(user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            int count = await work.Repository.GetCountMessagesAsync(user.Id);
            if (user.Access == 0 && count > 50) return BadRequest("Message limit reached");

            //Chat Gpt

            var result = await work.Repository.SendTextAsync(text);

            if (result == null || result == "") return BadRequest("Chat GPT request Exception");

            //Save message

            await work.Repository.AddMessageAsync(text, result, user.Id);

            return Ok(result);
        }

        [HttpPost("SendImage"), Authorize]
        public async Task<ActionResult> SendImage(IFormFile file)
        {
            if (!TryValidateModel(file, nameof(IFormFile))) return BadRequest("Not validate model");
            ModelState.ClearValidationState(nameof(IFormFile));

            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            int count = await work.Repository.GetCountMessagesAsync(user.Id);

            if (user.Access == 0 && count > 50) return BadRequest("Message limit reached");

            // Save Image

            string path = await work.Repository.AddFile(file);

            // Upload Image

            await work.Repository.UploadImageAsync(path);

            // Detect text

            string text = await work.Repository.DetectTextAsync(path);

            //Chat Gpt

            var result = await work.Repository.SendTextAsync(text);

            if (result == null || result == "") return BadRequest("Chat GPT request Exception");

            //Save message

            await work.Repository.AddMessageAsync(text, result, user.Id);

            return Ok(result);
        }

        [HttpPost("SendVoice"), Authorize]
        public async Task<ActionResult> SendVoice(IFormFile file)
        {
            if (!TryValidateModel(file, nameof(IFormFile))) return BadRequest("Not validate model");
            ModelState.ClearValidationState(nameof(IFormFile));

            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");
            if (user.Access < 3) return BadRequest("No access");

            //// Save Voice

            string path = await work.Repository.AddFile(file);

            ////Chat Gpt detect text

            var text = await work.Repository.SendVoiceAsync(path);

            if (text == null || text == "") return BadRequest("Chat GPT request Exception");


            //Chat Gpt

            var result = await work.Repository.SendTextAsync(text);

            if (result == null || result == "") return BadRequest("Chat GPT request Exception");

            //Save message

            await work.Repository.AddMessageAsync(text, result, user.Id);

            return Ok(new VoiceResponse() { Question = text, Response = result });
        }
        [HttpGet("GetMessages"), Authorize]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            if (user.Access < 2) return BadRequest("No access");

            return Ok(await work.Repository.GetMessagesAsync(user.Id));
        }
        [HttpGet("GetCountMessages"), Authorize]
        public async Task<ActionResult<int>> GetCountMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");
            int id = Int32.Parse(claimId.Value);
            return await work.Repository.GetCountMessagesAsync(id);
        }
        [HttpGet("BuyAccess"), Authorize]
        public async Task<ActionResult> BuyAccess(int access)
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            if (user.Access >= access) return BadRequest("Up access error!");

            Buy buy = new();
            buy.Email = user.Email;
            buy.OldAccess = user.Access;
            buy.NewAccess = access;

            user.Access = access;
            await work.Repository.UpdateUserAsync(user);

            if (buy.OldAccess == 0 && buy.NewAccess == 1) buy.Cost = 5;
            else if (buy.OldAccess == 0 && buy.NewAccess == 2) buy.Cost = 25;
            else if (buy.OldAccess == 0 && buy.NewAccess == 3) buy.Cost = 50;
            else if (buy.OldAccess == 1 && buy.NewAccess == 2) buy.Cost = 20;
            else if (buy.OldAccess == 1 && buy.NewAccess == 3) buy.Cost = 45;
            else if (buy.OldAccess == 2 && buy.NewAccess == 3) buy.Cost = 25;
            else buy.Cost = 0;

            await work.Repository.AddBuyAsync(buy);

            return Ok("Ok");
        }
    }
}
