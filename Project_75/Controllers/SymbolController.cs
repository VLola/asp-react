using Microsoft.AspNetCore.Mvc;
using Project_75.Models;
using System.Net;
using System.Text.Json;

namespace Project_75.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SymbolController : Controller
    {
        string path = "https://drive.google.com/u/0/uc?id=1rreGrM-cCMmO8DV0ShWUsW6Gx5grAoep&export=download";
        string pathFiles = Directory.GetCurrentDirectory() + "/Files/";
        [HttpGet]
        public IEnumerable<SymbolModel>? Get()
        {
            string json = System.IO.File.ReadAllText(pathFiles + "symbols");
            List<SymbolModel>? symbols = JsonSerializer.Deserialize<List<SymbolModel>>(json);
            //if (!System.IO.File.Exists(pathFiles + "symbols"))
            //{
            //    List<BetModel>? list = new();
            //    using (var client = new WebClient())
            //    {
            //        string json = client.DownloadString(path);
            //        list = JsonSerializer.Deserialize<List<BetModel>>(json);
            //        symbols = list.GroupBy(s => s.Symbol).Select(g => g.Key).Select(item=> new SymbolModel() { Name = item}).ToList();
            //        System.IO.File.WriteAllText(pathFiles + "symbols", JsonSerializer.Serialize(symbols));
            //    }
            //}
            return symbols;
        }
    }
}
