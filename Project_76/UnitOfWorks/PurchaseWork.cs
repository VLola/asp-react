using Project_76.HostContexts;
using Project_76.Repositories;

namespace Project_76.UnitOfWorks
{
    public class PurchaseWork
    {
        private HostContext _context = new HostContext();

        private PurchaseRepo? _purchaseRepo;

        public PurchaseRepo PurchaseRepo
        {
            get
            {
                if (_purchaseRepo == null) _purchaseRepo = new PurchaseRepo(_context);
                return _purchaseRepo;
            }
            set { _purchaseRepo = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
