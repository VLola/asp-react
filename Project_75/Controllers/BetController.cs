using Microsoft.AspNetCore.Mvc;
using Project_75.Models;
using Project_75.UnitOfWorks;
using System.Net;
using System.Text.Json;

namespace Project_75.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BetController : Controller
    {
        BetWork work;

        string path = "https://drive.google.com/u/0/uc?id=1rreGrM-cCMmO8DV0ShWUsW6Gx5grAoep&export=download";
        string pathFiles = Directory.GetCurrentDirectory() + "/Files/";
        public BetController()
        {
            work = new BetWork();
        }
        [HttpGet]
        public IEnumerable<Bet> Get()
        {
            List<Bet> list = new();
            //Console.WriteLine(Directory.GetCurrentDirectory());
            if (System.IO.File.Exists(pathFiles + "bets"))
            {
                //list = JsonSerializer.Deserialize<List<Bet>>(System.IO.File.ReadAllText(pathFiles + "bets"));
                //List<Bet> sortedList = list.OrderBy(o => o.CloseTime).ToList();
                //return sortedList;
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
        [HttpGet("Find")]
        public IEnumerable<Bet> Find(string symbol)
        {
            return work.BetRepo.Find(symbol);
        }
    }
}
