using Microsoft.EntityFrameworkCore;
using Project_124.Contexts;
using Project_124.Models;

namespace Project_124.Repositories
{
    public class AuthenticationRepo
    {
        public AzureContext context;
        public AuthenticationRepo(AzureContext context)
        {
            this.context = context;
        }
        public async Task<int> Add(DataUser dataUser)
        {
            User user = new User();
            user.Email = dataUser.Email;
            user.Password = dataUser.Password;
            user.IsBlocked = false;
            user.Access = 0;
            user.Role = "User";
            context.Users.Add(user);
            return await context.SaveChangesAsync();
        }
        public async Task<User?> CheckUser(DataUser dataUser)
        {
            User? user = await context.Users.FirstOrDefaultAsync(item => item.Email == dataUser.Email && item.Password == dataUser.Password);
            if (user != null) return user;
            else return null;
        }
        public async Task<bool> CheckEmail(DataUser dataUser)
        {
            User? user = await context.Users.FirstOrDefaultAsync(item => item.Email == dataUser.Email);
            if (user != null) return true;
            else return false;
        }
    }
}
