using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public string Author { get; set; }

        public string PublishDate { get; set; }

        public List<Quote> Quotes { get; set; }
    }
}