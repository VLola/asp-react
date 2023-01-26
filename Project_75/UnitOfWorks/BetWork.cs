using Project_75.HostContexts;
using Project_75.Repositories;

namespace Project_75.UnitOfWorks
{
    public class BetWork
    {
        private HostContext _context = new HostContext();

        private BetRepo? _betRepo;

        public BetRepo BetRepo
        {
            get
            {
                if (_betRepo == null) _betRepo = new BetRepo(_context);
                return _betRepo;
            }
            set { _betRepo = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
