using Microsoft.EntityFrameworkCore;
using Project_75.Models;

namespace Project_75.HostContexts
{
    public class BetContext : DbContext
    {
        private string connectionString;
        public DbSet<Bet> Bets { get; set; }
        public BetContext(string name)
        {
            connectionString = $"Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog={name};Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(new ConfigurationBuilder()
            //    .SetBasePath(Directory.GetCurrentDirectory())
            //    .AddJsonFile("appsettings.json")
            //    .Build()
            //    .GetConnectionString("BetConnection"));
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
