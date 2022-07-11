using InsiderArticles.Entities;
using InsiderArticles.Services.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace InsiderArticles.DataAccess.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly InsiderArticlesContext context;

        public ArticleRepository(InsiderArticlesContext context)
        {
            this.context = context;
        }

        public async Task<List<Article>> GetList()
        {
            return await this.context.Articles.ToListAsync();
        }

        public async Task<Article?> GetById(string id)
        {
            return await this.context.Articles.FindAsync(id);
        }

        public async Task Create(Article article)
        {
            this.context.Articles.Add(article);
            await this.SaveChangesAsync(article.Id);
        }

        public async Task Edit(Article article)
        {
            this.context.Entry(article).State = EntityState.Modified;
            await this.SaveChangesAsync(article.Id);
        }

        public async Task Delete(Article article)
        {
            this.context.Articles.Remove(article);
            await this.SaveChangesAsync(article.Id);
        }

        private async Task SaveChangesAsync(string id)
        {
            try
            {
                await this.context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (this.ExistsArticle(id))
                {
                    throw;
                }
                else
                {
                    throw new DbUpdateException("Entity not found");
                }
            }
        }

        private bool ExistsArticle(string id)
        {
            return (this.context.Articles?.Any(x => x.Id == id)).GetValueOrDefault();
        }
    }
}