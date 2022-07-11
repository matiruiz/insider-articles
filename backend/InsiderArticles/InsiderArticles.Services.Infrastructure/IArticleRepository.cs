using InsiderArticles.Entities;

namespace InsiderArticles.Services.Infrastructure
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetList();

        Task<Article?> GetById(string id);

        Task Create(Article article);

        Task Edit(Article article);

        Task Delete(Article article);
    }
}