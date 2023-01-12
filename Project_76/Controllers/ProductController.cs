using Microsoft.AspNetCore.Mvc;
using Project_76.Models;
using Project_76.UnitOfWorks;

namespace Project_76.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        ProductWork work;
        public ProductController()
        {
            work = new ProductWork();
        }
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return work.ProductRepo.GetAll();
        }
        [HttpDelete]
        public bool Remove(int id)
        {
            return work.ProductRepo.Remove(id);
        }
        [HttpPost]
        [Route("Update")]
        public void Update([FromBody] Product product)
        {
            work.ProductRepo.Update(product);
        }
        [HttpPost]
        [Route("Add")]
        public void Add([FromBody] Product product)
        {
            work.ProductRepo.Add(product);
        }
    }
}
