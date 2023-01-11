using Project_76.HostContexts;
using Project_76.Models;

namespace Project_76.Repositories
{
    public class ProductRepo : IRepo<Product>
    {
        public HostContext context;
        public ProductRepo(HostContext context)
        {
            this.context = context;
        }
        public Product Get(int id) => context.Products.Find(id);
        public IEnumerable<Product> GetAll() => context.Products;
    }
}
