using InsiderArticles.Entities;
using InsiderArticles.Services.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace InsiderArticles.WebApiCore.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticlesController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        // GET: api/Articles?searchText
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles(string? searchText = null)
        {
            return await this.articleService.GetList(searchText);
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(string id)
        {
            var article = await this.articleService.GetById(id);
            if (article == null)
            {
                return this.NotFound();
            }

            return article;
        }

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(string id, Article article)
        {
            if (id != article.Id)
            {
                return this.BadRequest();
            }

            await this.articleService.Edit(article);

            return this.NoContent();
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            await this.articleService.Create(article);

            return this.CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(string id)
        {
            await this.articleService.Delete(id);

            return this.NoContent();
        }
    }
}