using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.Runtime.Internal;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using Project_124.Models;
using Project_124.UnitOfWorks;
using System.Net;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

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
            Claim? claimAccess = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
            if (claimId != null && claimAccess != null)
            {
                int id = Int32.Parse(claimId.Value);
                int access = Int32.Parse(claimAccess.Value);
                int count = await work.UserRepo.GetCountMessages(id);

                if (access == 0 && count > 50)  return BadRequest("Message limit reached");

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
            else return NotFound("User not found");
        }

        [HttpPost("SendImage"), Authorize]
        public async Task<ActionResult> SendImage(IFormFile file)
        {
            if (!TryValidateModel(file, nameof(IFormFile)))
                return BadRequest("blya");
            ModelState.ClearValidationState(nameof(IFormFile));
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            Claim? claimAccess = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
            if (claimId != null && claimAccess != null)
            {
                int id = Int32.Parse(claimId.Value);
                int access = Int32.Parse(claimAccess.Value);
                int count = await work.UserRepo.GetCountMessages(id);

                if (access == 0 && count > 50) return BadRequest("Message limit reached");

                // Save Image

                string path = work.UserRepo.AddFile(file);

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

                if (result != null)
                {
                    Message message = new();
                    message.Question = fullText;
                    message.Response = result;
                    message.DateTime = DateTime.UtcNow;
                    message.UserId = id;
                    await work.UserRepo.AddMessage(message);

                    return Ok("Ok");
                }
                return BadRequest("Chat GPT request Exception");
            }
            else return NotFound("User not found");
        }
        [HttpGet("GetMessages"), Authorize]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            Claim? claimAccess = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid);
            if (claimId != null && claimAccess != null)
            {
                int id = Int32.Parse(claimId.Value);
                int access = Int32.Parse(claimAccess.Value);
                if (access >= 2)
                {
                    return Ok(await work.UserRepo.GetMessages(id));
                }
                else return BadRequest("No access");
            }
            else return NotFound("User not found");
        }
        [HttpGet("GetCountMessages"), Authorize]
        public async Task<ActionResult<int>> GetCountMessages()
        {
            Claim? claimId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.PrimarySid);
            if (claimId != null)
            {
                int id = Int32.Parse(claimId.Value);
                return await work.UserRepo.GetCountMessages(id);
            }
            else return NotFound("User not found");
        }
    }
}
