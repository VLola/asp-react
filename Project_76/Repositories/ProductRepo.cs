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
        public void Add(Product product) {
            context.Products.Add(product);
            context.SaveChanges();
        }
        public bool Remove(int id)
        {
            Product? product = context.Products.Find(id);
            if (product != null)
            {
                context.Products.Remove(product);
                context.SaveChanges();
                return true;
            }
            else return false;
        }
        public void Update(Product product)
        {
            context.Products.Update(product);
            context.SaveChanges();
        }
    }
}
