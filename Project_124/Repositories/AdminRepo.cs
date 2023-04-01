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
        public IEnumerable<User> GetUsers()
        {
            return context.Users.Where(user => user.Role == "User");
        }
        public IEnumerable<Buy> GetBuys()
        {
            return context.Buys;
        }
        public async Task UpdateUser(User user)
        {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }
    }
}
