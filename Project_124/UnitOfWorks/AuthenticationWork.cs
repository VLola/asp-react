using Project_124.Contexts;
using Project_124.Repositories;

namespace Project_124.UnitOfWorks
{
    public class AuthenticationWork
    {
        private AzureContext _context = new AzureContext();

        private AuthenticationRepo? _repository;

        public AuthenticationRepo Repository
        {
            get
            {
                if (_repository == null) _repository = new AuthenticationRepo(_context);
                return _repository;
            }
            set { _repository = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
