using InsiderArticles.Entities;
using InsiderArticles.Services.Infrastructure;

namespace InsiderArticles.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository articleRepository;

        public ArticleService(IArticleRepository articleRepository)
        {
            this.articleRepository = articleRepository;
        }

        public async Task<List<Article>> GetList(string? searchText)
        {
            var articles = await this.articleRepository.GetList();

            if (!string.IsNullOrEmpty(searchText))
            {
                articles = articles.Where(x => x.Title.Contains(searchText, StringComparison.InvariantCultureIgnoreCase)).ToList();
            }

            return articles;
        }

        public Task<Article?> GetById(string id)
        {
            return this.articleRepository.GetById(id);
        }

        public Task Create(Article newArticle)
        {
            return this.articleRepository.Create(newArticle);
        }

        public Task Edit(Article updatedArticle)
        {
            return this.articleRepository.Edit(updatedArticle);
        }

        public async Task Delete(string id)
        {
            var article = await this.GetById(id);
            if (article != null)
            {
                await this.articleRepository.Delete(article);
            }
        }
    }
}