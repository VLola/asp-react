using Microsoft.EntityFrameworkCore;
using Project_75.Models;

namespace Project_75.HostContexts
{
    public class BetContext : DbContext
    {
        public DbSet<Bet> Bets { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build()
                .GetConnectionString("BetConnection"));
        }
    }
}
