import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book, Quote } from 'src/app/models/book.model';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { DayNightModeService } from 'src/app/services/sharedDayAndNightMode.service';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent {
  @Output() bookAdded = new EventEmitter<Book>();
  @Input() existingBooks: Book[] = [];
  @Output() cancelled = new EventEmitter<void>();

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

  errorMessage: string = '';

  get isDayMode(): boolean {
    return this.dayNightModeService.isDayMode;
  }

  constructor(
    private bookService: BookService,
    protected dayNightModeService: DayNightModeService
  ) {}

  async ngOnInit() {
    this.loadBooks();
    
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        console.log('Initial Books list:', books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  addBook() {
    const existingBook = this.existingBooks.find(
      (book) => book.title.toLowerCase() === this.newBook.title.toLowerCase()
    );

    if (existingBook) {
      this.errorMessage = 'En bok med samma titel finns redan';
      return;
    }

    if (this.newBook.title && this.newBook.author && this.newBook.publishDate) {
      const tempId = uuidv4();
      const bookTitle = this.newBook.title;

      const bookToAdd: Book = {
        id: tempId,
        title: this.newBook.title,
        author: this.newBook.author,
        publishDate: this.newBook.publishDate,
        quotes: this.newBook.quotes,
        quotesVisible: false
      };

      bookToAdd.quotes = bookToAdd.quotes.filter((quote) => quote.text.trim() !== '');

      this.bookService.addBook(bookToAdd).subscribe({
        next: (addedBook) => {
          this.loadBooks();
          this.resetForm();
          this.addQuoteWithStoredTitle(bookTitle);
          this.bookAdded.emit(addedBook);
        },
        error: (error) => {
          console.error('Det gick inte att lägga till ny bok:', error);
        }
      });
    }
  }

  addQuoteWithStoredTitle(bookTitle: string) {
    const tempQuoteId = uuidv4();
    
    if (this.newQuoteText) {
      const newQuote: Quote = {
        quoteId: tempQuoteId,
        text: this.newQuoteText,
        pageNumber: this.newQuotePageNumber,
        bookTitle: bookTitle,
        isFavourite: this.newQuoteIsFavourite
      };

      this.newBook.quotes.push(newQuote);
      this.newQuoteText = '';
      this.newQuotePageNumber = 0;
      this.newQuoteIsFavourite = false;

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

  cancel() {
    this.resetForm();
    this.cancelled.emit();
  }
}
