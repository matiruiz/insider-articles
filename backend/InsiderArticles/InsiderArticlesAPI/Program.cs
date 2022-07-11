using InsiderArticles.DataAccess;
using InsiderArticles.DataAccess.Repositories;
using InsiderArticles.Services;
using InsiderArticles.Services.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<InsiderArticlesContext>(opt => opt.UseInMemoryDatabase("Articles"));

builder.Services.AddTransient<IArticleService, ArticleService>();
builder.Services.AddTransient<IArticleRepository, ArticleRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();