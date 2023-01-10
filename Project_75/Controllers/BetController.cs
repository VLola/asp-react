using Microsoft.AspNetCore.Mvc;
using Project_75.Models;

namespace Project_75.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BetController : Controller
    {
        string path = "https://drive.google.com/u/0/uc?id=1rreGrM-cCMmO8DV0ShWUsW6Gx5grAoep&export=download";
        string pathFiles = Directory.GetCurrentDirectory() + "/Files/";
        [HttpGet]
        public IEnumerable<BetModel> Get()
        {
            Console.WriteLine(Directory.GetCurrentDirectory());
            if(!System.IO.File.Exists(pathFiles + "symbols"))
            {

            }
            List<BetModel>? list = new();
            //using (var client = new WebClient())
            //{
            //    string json = client.DownloadString(path);
            //    list = JsonSerializer.Deserialize<List<BetModel>>(json);
            //}
            return list;
        }
    }
}
