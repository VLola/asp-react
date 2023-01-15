using Microsoft.AspNetCore.Mvc;
using Project_75.Models;
using System.Net;
using System.Text.Json;

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
            List<BetModel> list = new();
            //Console.WriteLine(Directory.GetCurrentDirectory());
            if (System.IO.File.Exists(pathFiles + "bets"))
            {
                list = JsonSerializer.Deserialize<List<BetModel>>(System.IO.File.ReadAllText(pathFiles + "bets"));
                //int i = 0;
                //foreach (var item in JsonSerializer.Deserialize<List<BetModel>>(System.IO.File.ReadAllText(pathFiles + "bets")))
                //{
                //    i++;
                //    list.Add(item);
                //    if (i > 100) break;
                //}
            }
            //using (var client = new WebClient())
            //{
            //    string json = client.DownloadString(path);
            //    list = JsonSerializer.Deserialize<List<BetModel>>(json);
            //}
            return list;
        }
        [HttpGet("GetStopLoses")]
        public IEnumerable<double> GetStopLoses()
        {
            double[] array = { 0.5, 1, 1.5, 2 };
            return array;
        }
    }
}
