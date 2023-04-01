using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.S3;
using Amazon.S3.Model;
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
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if(user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            int count = await work.Repository.GetCountMessagesAsync(user.Id);
            if (user.Access == 0 && count > 50) return BadRequest("Message limit reached");

            OpenAIAPI api = new OpenAIAPI(new APIAuthentication("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", "org-QJVBWCJXr5P8ILTVhZU9h5tH"));

            var result = await api.Completions.GetCompletion(text);
            if (result == null) return BadRequest("Chat GPT request Exception");

            Message message = new();
            message.Question = text;
            message.Response = result;
            message.DateTime = DateTime.UtcNow;
            message.UserId = user.Id;
            await work.Repository.AddMessageAsync(message);

            return Ok("Ok");
        }

        [HttpPost("SendImage"), Authorize]
        public async Task<ActionResult> SendImage(IFormFile file)
        {
            if (!TryValidateModel(file, nameof(IFormFile)))
                return BadRequest("blya");
            ModelState.ClearValidationState(nameof(IFormFile));

            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            int count = await work.Repository.GetCountMessagesAsync(user.Id);

            if (user.Access == 0 && count > 50) return BadRequest("Message limit reached");

            // Save Image

            string path = work.Repository.AddFile(file);

            // Load Image

            string imageName = Path.GetFileName(path);
            string bucket = "valikbucket";

            var putRequest = new PutObjectRequest
            {
                BucketName = bucket,
                Key = imageName,
                FilePath = path,
                ContentType = "text/plain"
            };

            putRequest.Metadata.Add("x-amz-meta-title", "someTitle");
            IAmazonS3 client = new AmazonS3Client("AKIA6PVL36AGMXQV32FU", "TvPsi8ZFioNPgWtKLfA5A5rOQU9KoHY9Fva5aK9n", Amazon.RegionEndpoint.USWest2);
            PutObjectResponse response = client.PutObjectAsync(putRequest).Result;


            // Detect text

            AmazonRekognitionClient rekognitionClient = new AmazonRekognitionClient("AKIA6PVL36AGMXQV32FU", "TvPsi8ZFioNPgWtKLfA5A5rOQU9KoHY9Fva5aK9n", Amazon.RegionEndpoint.USWest2);

            DetectTextRequest detectTextRequest = new DetectTextRequest()
            {
                Image = new Amazon.Rekognition.Model.Image()
                {
                    S3Object = new Amazon.Rekognition.Model.S3Object()
                    { Name = imageName, Bucket = bucket },
                }
            };
            string fullText = "";
            DetectTextResponse detectTextResponse = rekognitionClient.DetectTextAsync(detectTextRequest).Result;
            detectTextResponse.TextDetections.Where(item => item.Type.Value == "WORD").Select(item => item.DetectedText).ToList().ForEach(item => fullText += item + " ");


            //Chat Gpt

            OpenAIAPI api = new OpenAIAPI(new APIAuthentication("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", "org-QJVBWCJXr5P8ILTVhZU9h5tH"));
            var result = await api.Completions.GetCompletion(fullText);

            if (result == null) return BadRequest("Chat GPT request Exception");

            Message message = new();
            message.Question = fullText;
            message.Response = result;
            message.DateTime = DateTime.UtcNow;
            message.UserId = user.Id;
            await work.Repository.AddMessageAsync(message);

            return Ok("Ok");
        }
        [HttpGet("GetMessages"), Authorize]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");

            User? user = await work.Repository.GetUserAsync(Int32.Parse(claimId.Value));
            if (user == null) return NotFound("User not found");
            if (user.EndBlockedTime > DateTime.UtcNow) return BadRequest("User is blocked");

            if (user.Access >= 2) return Ok(await work.Repository.GetMessagesAsync(user.Id));
            else return BadRequest("No access");
        }
        [HttpGet("GetCountMessages"), Authorize]
        public async Task<ActionResult<int>> GetCountMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId == null) return NotFound("Claim not found");
            int id = Int32.Parse(claimId.Value);
            return await work.Repository.GetCountMessagesAsync(id);
        }
    }
}
