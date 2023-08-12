import { Component, EventEmitter, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { Quote } from 'src/app/models/book.model';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library


@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent {
  @Output() bookAdded = new EventEmitter<Book>(); // Emit an event when a new book is added
  newBook: Book = {
    id: '',
    title: '',
    author: '',
    publishDate: '',
    quotes: [],
    quotesVisible: false
  };
  newQuoteText: string = '';
  newQuotePageNumber: number = 0;
  newQuoteIsFavourite: boolean = false;

  constructor(private bookService: BookService) {}

  addBook() {
    if (this.newBook.title && this.newBook.author && this.newBook.publishDate) {
      const tempId = uuidv4();
      // Store the title before resetting the form
      const bookTitle = this.newBook.title;
      
      // Create a new book object for adding
      const bookToAdd: Book = {
        id: tempId, // Use null as a placeholder for the ID
        title: this.newBook.title,
        author: this.newBook.author,
        publishDate: this.newBook.publishDate,
        quotes: this.newBook.quotes,
        quotesVisible: false
      };
  
      // Remove empty quotes
      bookToAdd.quotes = bookToAdd.quotes.filter(quote => quote.text.trim() !== '');
  
      // Send the request to add the book with quotes
      this.bookService.addBook(bookToAdd).subscribe({
        next: (addedBook) => {
          console.log('New Book added:', addedBook);
          // Handle any necessary updates or actions after adding the book
          // For example, you might want to update your books list
          this.resetForm();
          // Use the stored title when adding the quote
          this.addQuoteWithStoredTitle(bookTitle);
        },
        error: (error) => {
          console.error('Error adding new book:', error);
        }
      });
    }
  }
  
  addQuoteWithStoredTitle(bookTitle: string) {
    const tempQuoteId = uuidv4();
    if (this.newQuoteText) {
      const newQuote: Quote = {
        quoteId: tempQuoteId, // You can generate this if needed
        text: this.newQuoteText,
        pageNumber: this.newQuotePageNumber,
        bookTitle: bookTitle, // Use the stored title
        isFavourite: this.newQuoteIsFavourite
      };
      this.newBook.quotes.push(newQuote);
      this.newQuoteText = ''; // Clear the input
      this.newQuotePageNumber = 0; // Reset the page number input
      this.newQuoteIsFavourite = false; // Reset the isFavourite input
  
      // Code to add quotes
      console.log('After adding quotes:', this.newBook);
    }
  }
  

  resetForm() {
    this.newBook = {
      id: '',
      title: '',
      author: '',
      publishDate: '',
      quotes: [],
      quotesVisible: false
    };
    this.newQuoteText = '';
    this.newQuotePageNumber = 0;
    this.newQuoteIsFavourite = false;
  }
}
