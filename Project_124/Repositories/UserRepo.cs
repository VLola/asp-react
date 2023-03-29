using Microsoft.EntityFrameworkCore;
using Project_124.Contexts;
using Project_124.Models;

namespace Project_124.Repositories
{
    public class UserRepo
    {
        public AzureContext context;
        public UserRepo(AzureContext context)
        {
            this.context = context;
        }
        public User? Get(int id) => context.Users.Find(id);
        public IEnumerable<User> GetAll() => context.Users;

        public async Task<int> Add(DataUser dataUser)
        {
            User user = new User();
            user.Email = dataUser.Email;
            user.Password = dataUser.Password;
            context.Users.Add(user);
            return await context.SaveChangesAsync();
        }
        public async Task<bool> CheckUser(DataUser dataUser)
        {
            User? user = await context.Users.FirstOrDefaultAsync(item => item.Email == dataUser.Email && item.Password == dataUser.Password);
            if (user != null) return true;
            else return false;
        }
        public async Task<bool> CheckEmail(DataUser dataUser)
        {
            User? user = await context.Users.FirstOrDefaultAsync(item => item.Email == dataUser.Email);
            if (user != null) return true;
            else return false;
        }
    }
}
