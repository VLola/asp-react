using Project_124.Contexts;
using Project_124.Repositories;

namespace Project_124.UnitOfWorks
{
    public class AdminWork
    {
        private AzureContext _context = new AzureContext();

        private AdminRepo? _repository;

        public AdminRepo Repository
        {
            get
            {
                if (_repository == null) _repository = new AdminRepo(_context);
                return _repository;
            }
            set { _repository = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
