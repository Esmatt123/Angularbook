export interface Book {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    quotes: Quote[];
  }
  
  export interface Quote {
    quoteId: string;
    text: string;
    pageNumber: number;
    bookTitle: string; // Foreign key to link to the associated book
    isFavourite: boolean;
  }
  