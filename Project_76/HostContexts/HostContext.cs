using Microsoft.EntityFrameworkCore;
using Project_76.Models;

namespace Project_76.HostContexts
{
    public class HostContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build()
                .GetConnectionString("DefaultConnection"));
        }
    }
}
