using Microsoft.AspNetCore.Mvc;
using Project_75.Models;
using Project_75.UnitOfWorks;
using System.Net;
using System.Text.Json;

namespace Project_75.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SymbolController : Controller
    {
        string pathFiles = Directory.GetCurrentDirectory() + "/Files/";

        [HttpGet]
        public IEnumerable<SymbolBase>? Get()
        {
            string json = System.IO.File.ReadAllText(pathFiles + "symbols");
            List<SymbolBase>? symbols = JsonSerializer.Deserialize<List<SymbolBase>>(json);
            return symbols;
        }
        [HttpGet("Find")]
        public IEnumerable<Symbol>? Find(string name)
        {
            if (!String.IsNullOrEmpty(name) && name != "undefined")
            {
                SymbolWork work = new SymbolWork(name);
                return work.SymbolRepo.Find();
            }
            else return null;
        }
    }
}
