using Microsoft.EntityFrameworkCore;
using Project_124.Contexts;
using Project_124.Models;
using System.IO;

namespace Project_124.Repositories
{
    public class UserRepo
    {
        string path = Directory.GetCurrentDirectory() + "/Files/";
        public AzureContext context;
        public UserRepo(AzureContext context)
        {
            this.context = context;
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
        public string AddFile(IFormFile file)
        {
            if (!Directory.Exists(path)) Directory.CreateDirectory(path);
            FileInfo fi = new FileInfo(file.FileName);
            if (file.Length > 0)
            {
                string path = RandomName(fi.Extension);
                using (var stream = System.IO.File.Create(path))
                {
                    file.CopyToAsync(stream);
                    return path;
                }
            }
            return "";
        }
        public string RandomName(string extenc)
        {
            while (true)
            {
                string name = Path.GetRandomFileName();
                string fileName = path + name + extenc;
                if (!System.IO.File.Exists(fileName))
                {
                    return fileName;
                }
            }
        }
    }
}
