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
        public async Task<List<Message>> GetMessages(int id)
        {
            return await context.Messages.Where(message=>message.UserId == id).ToListAsync();
        }
        public async Task AddMessage(Message message)
        {
            await context.Messages.AddAsync(message);
            await context.SaveChangesAsync();
        }
        public async Task<int> GetCountMessages(int id)
        {
            DateTime startTime = DateTime.Today;
            DateTime endTime = startTime.AddDays(1);
            return await context.Messages.Where(message => message.UserId == id && message.DateTime > startTime && message.DateTime < endTime).CountAsync();
        }
    }
}
