using Microsoft.AspNetCore.Mvc;
using Project_76.Models;

namespace Project_76.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PurchaseController : Controller
    {
        [HttpGet]
        public IEnumerable<Purchase> Get()
        {
            List<Purchase>? list = new();
            return list;
        }
    }
}
