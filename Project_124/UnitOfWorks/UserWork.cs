using Project_124.Contexts;
using Project_124.Repositories;

namespace Project_124.UnitOfWorks
{
    public class UserWork
    {
        private AzureContext _context = new AzureContext();

        private UserRepo? _userRepo;

        public UserRepo UserRepo
        {
            get
            {
                if (_userRepo == null) _userRepo = new UserRepo(_context);
                return _userRepo;
            }
            set { _userRepo = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
