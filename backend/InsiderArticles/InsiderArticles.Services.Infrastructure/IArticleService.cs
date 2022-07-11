using InsiderArticles.Entities;

namespace InsiderArticles.Services.Infrastructure
{
    public interface IArticleService
    {
        Task<List<Article>> GetList(string? searchText);

        Task<Article?> GetById(string id);

        Task Create(Article newArticle);

        Task Edit(Article updatedArticle);

        Task Delete(string id);
    }
}