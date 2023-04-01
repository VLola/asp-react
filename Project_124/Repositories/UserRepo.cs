using Amazon.Rekognition.Model;
using Amazon.Rekognition;
using Microsoft.EntityFrameworkCore;
using Project_124.Contexts;
using Project_124.Models;
using Amazon.S3.Model;
using Amazon.S3;
using OpenAI_API;
using OpenAI.Net;

namespace Project_124.Repositories
{
    public class UserRepo
    {
        string pathFiles = Directory.GetCurrentDirectory() + "/Files/";
        public AzureContext context;
        public UserRepo(AzureContext context)
        {
            this.context = context;
        }
        public async Task<User?> GetUserAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }
        public async Task<List<Models.Message>> GetMessagesAsync(int id)
        {
            return await context.Messages.Where(message=>message.UserId == id).ToListAsync();
        }
        public async Task<int> GetCountMessagesAsync(int id)
        {
            DateTime startTime = DateTime.Today;
            DateTime endTime = startTime.AddDays(1);
            return await context.Messages.Where(message => message.UserId == id && message.DateTime > startTime && message.DateTime < endTime).CountAsync();
        }
        public async Task<string> AddFile(IFormFile file)
        {
            if (!Directory.Exists(pathFiles)) Directory.CreateDirectory(pathFiles);
            FileInfo fi = new FileInfo(file.FileName);
            if (file.Length > 0)
            {
                string path = RandomName(fi.Extension);
                using (var stream = System.IO.File.Create(path))
                {
                    await file.CopyToAsync(stream);
                    return path;
                }
            }
            return "";
        }
        public string RandomName(string extenc)
        {
            while (true)
            {
                string name = Path.GetRandomFileName();
                string fileName = pathFiles + name + extenc;
                if (!System.IO.File.Exists(fileName))
                {
                    return fileName;
                }
            }
        }
        public async Task<string> DetectTextAsync(string path)
        {
            string bucket = "valikbucket";
            string imageName = Path.GetFileName(path);
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
            DetectTextResponse detectTextResponse = await rekognitionClient.DetectTextAsync(detectTextRequest);
            detectTextResponse.TextDetections.Where(item => item.Type.Value == "WORD").Select(item => item.DetectedText).ToList().ForEach(item => fullText += item + " ");
            return fullText;
        }

        public async Task UploadImageAsync(string path)
        {
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
            PutObjectResponse response = await client.PutObjectAsync(putRequest);
        }
        public async Task<string> SendTextAsync(string text)
        {
            //OpenAIAPI api = new OpenAIAPI(new APIAuthentication("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", "org-QJVBWCJXr5P8ILTVhZU9h5tH"));
            //return await api.Completions.GetCompletion(text);

            using var host = Host.CreateDefaultBuilder()
            .ConfigureServices((builder, services) =>
            {
                services.AddOpenAIServices(options => {
                    options.ApiKey = "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";
                });
            })
            .Build();

            var openAi = host.Services.GetService<IOpenAIService>();
            if (openAi == null) return "";
            var response = await openAi.TextCompletion.Get(text);

            string fullText = "";
            if (response.IsSuccess)
            {
                foreach (var result in response.Result.Choices) fullText += result.Text;
            }
            else fullText += response.ErrorMessage;
            return fullText;
        }
        public async Task AddMessageAsync(string question, string response, int id)
        {
            Models.Message message = new();
            message.Question = question;
            message.Response = response;
            message.DateTime = DateTime.UtcNow;
            message.UserId = id;
            await context.Messages.AddAsync(message);
            await context.SaveChangesAsync();
        }
    }
}
