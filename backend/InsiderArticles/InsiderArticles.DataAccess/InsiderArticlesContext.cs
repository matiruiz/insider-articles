using InsiderArticles.Entities;
using Microsoft.EntityFrameworkCore;

namespace InsiderArticles.DataAccess
{
    public class InsiderArticlesContext : DbContext
    {
        public InsiderArticlesContext(DbContextOptions<InsiderArticlesContext> options)
            : base(options)
        {
        }

        public DbSet<Article> Articles { get; set; } = null!;
    }
}