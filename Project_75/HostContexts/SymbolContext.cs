using Microsoft.EntityFrameworkCore;
using Project_75.Models;

namespace Project_75.HostContexts
{
    public class SymbolContext : DbContext
    {
        private string connectionString;
        public DbSet<Symbol> Symbols { get; set; }
        public SymbolContext(string name)
        {
            connectionString = $"Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog={name};Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(new ConfigurationBuilder()
            //    .SetBasePath(Directory.GetCurrentDirectory())
            //    .AddJsonFile("appsettings.json")
            //    .Build()
            //    .GetConnectionString("SymbolConnection"));
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
