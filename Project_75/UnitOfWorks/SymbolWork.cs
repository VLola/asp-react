using Project_75.HostContexts;
using Project_75.Repositories;

namespace Project_75.UnitOfWorks
{
    public class SymbolWork
    {
        private SymbolContext _context;

        private SymbolRepo? _symbolRepo;
        public SymbolWork(string name)
        {
            _context = new SymbolContext(name);
        }

        public SymbolRepo SymbolRepo
        {
            get
            {
                if (_symbolRepo == null) _symbolRepo = new SymbolRepo(_context);
                return _symbolRepo;
            }
            set { _symbolRepo = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
