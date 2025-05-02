using CustomerPaymentsPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerPaymentsPortal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Payment> Payments { get; set; }

        internal Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }

}
