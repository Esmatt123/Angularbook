namespace Domain
{
    public class Quote
    {
        public Guid QuoteId { get; set; }
        public string Text { get; set; }
        public int PageNumber { get; set; }
        
        // Foreign key to link the quote to its associated book.
        public Guid BookId { get; set; }
    
        // Navigation property representing the associated book.
        public Book Book { get; set; }

        public bool IsFavourite { get; set; }
    }
}