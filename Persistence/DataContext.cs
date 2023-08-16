using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
          public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Quote> Quotes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        // Define the relationship between Book and Quote.
        modelBuilder.Entity<Quote>()
            .HasOne(q => q.Book)          // Quote has one Book
            .WithMany(b => b.Quotes)      // Book has many Quotes
            .HasForeignKey(q => q.BookId); // Foreign key property in Quote
    }
    }
}