using Project_76.HostContexts;
using Project_76.Repositories;

namespace Project_76.UnitOfWorks
{
    public class ProductWork
    {
        private HostContext _context = new HostContext();

        private ProductRepo? _productRepo;

        public ProductRepo ProductRepo
        {
            get
            {
                if (_productRepo == null) _productRepo = new ProductRepo(_context);
                return _productRepo;
            }
            set { _productRepo = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
