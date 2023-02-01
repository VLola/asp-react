using Microsoft.AspNetCore.Mvc;
using Project_75.Models;
using Project_75.UnitOfWorks;

namespace Project_75.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BetController : Controller
    {
        [HttpGet("GetStopLoses")]
        public IEnumerable<double> GetStopLoses()
        {
            double[] array = { 0.5, 1, 1.5, 2 };
            return array;
        }
        [HttpGet("Find")]
        public string? Find(string name, int number)
        {
            if (!String.IsNullOrEmpty(name))
            {
                BetWork work = new BetWork(name);
                return work.BetRepo.Find(number);
            }
            else return null;
        }
    }
}
