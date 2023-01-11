using Microsoft.AspNetCore.Mvc;
using Project_76.Models;

namespace Project_76.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            List<Product>? list = new();
            list.Add(new Product() { Id = 1, Title = "valikvalikvalikvalikvalikvalikvalik", Description = "valikvalikvalikvalikvalikvalikvalik", Image= "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/8/_/8_65_1_3.jpg" });
            list.Add(new Product() { Id = 2, Title = "valik", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/8/_/8_65_1_3.jpg"});
            list.Add(new Product() { Id = 3, Title = "valik1", Description = "lola1", Image= "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 4, Title = "valik1", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 5, Title = "valik1", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 6, Title = "valik1", Description = "valikvalikvalikvalikvalikvalikvalikvalikvalikvalikvalikvalikvalikvalik", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 7, Title = "valik1", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 8, Title = "valikvalikvalikvalikvalikvalikvalikvalikvalikvalik", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            list.Add(new Product() { Id = 9, Title = "valik1", Description = "lola1", Image = "https://yellow.ua/media/catalog/product/cache/9/image/508x508/9df78eab33525d08d6e5fb8d27136e95/m/p/mpln3ref-1600x120.jpg" });
            return list;
        }
    }
}
