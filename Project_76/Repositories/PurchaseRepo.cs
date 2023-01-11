using Project_76.HostContexts;
using Project_76.Models;

namespace Project_76.Repositories
{
    public class PurchaseRepo : IRepo<Purchase>
    {
        public HostContext context;
        public PurchaseRepo(HostContext context)
        {
            this.context = context;
        }
        public Purchase Get(int id) => context.Purchases.Find(id);
        public IEnumerable<Purchase> GetAll() => context.Purchases;
    }
}
