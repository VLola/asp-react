using Microsoft.EntityFrameworkCore;
using Project_76.Models;
using System.Collections.Generic;

namespace Project_76.HostContexts
{
    public class HostContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public HostContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }
        public DbSet<Purchase> Purchases { get; set; }
    }
}
