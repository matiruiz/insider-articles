using System.ComponentModel.DataAnnotations;

namespace InsiderArticles.Entities
{
    public class Article
    {
        public Article()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        [Required, MaxLength(50)]
        public string Title { get; set; }

        [Required, MaxLength(50)]
        public string Author { get; set; }

        [Required]
        public DateTime PublicationDate { get; set; }

        [MaxLength(1000)]
        public string Body { get; set; }
    }
}