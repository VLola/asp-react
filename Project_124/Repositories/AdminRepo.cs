using Project_124.Contexts;
using Project_124.Models;

namespace Project_124.Repositories
{
    public class AdminRepo
    {
        public AzureContext context;
        public AdminRepo(AzureContext context)
        {
            this.context = context;
        }
        public User? Get(int id) => context.Users.Find(id);
        public IEnumerable<User> GetUsers()
        {
            return context.Users.Where(user=>user.Role == "User");
        }

    }
}
