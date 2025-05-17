import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Book, Quote } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { DayNightModeService } from "src/app/services/sharedDayAndNightMode.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  editModal: boolean = false;
  selectedBookForEdit: Book | null = null;
  selectedBookForQuotes: Book | null = null;
  addingBook: boolean = false;
  

  constructor(
    private bookService: BookService,
    protected dayNightModeService: DayNightModeService
  ) {}

  get isDayMode(): boolean {
    return this.dayNightModeService.isDayMode;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
   
  
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        console.log('Books loaded:', books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error headers:', error.headers);
      }
    });
  }
  

  toggleEditModal(book: Book) {
    if (this.selectedBookForEdit === book) {
      this.selectedBookForEdit = null;
    } else {
      this.selectedBookForEdit = book;
    }
  }

  openEditModal(book: Book) {
    this.selectedBookForEdit = book;
  }

  closeEditModal() {
    this.selectedBookForEdit = null;
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe({
      next: () => {
        console.log('Book deleted:', book.id);
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error deleting book:', error);
      }
    });
  }

  toggleQuotes(book: Book) {
    book.quotesVisible = !book.quotesVisible;
  }

  handleSave(updatedBook: Book) {
    this.bookService.updateBook(updatedBook).subscribe({
      next: () => {
        this.loadBooks();
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Error updating book:', error);
      }
    });
  }

  toggleQuoteIsFavourite(quote: Quote) {
    this.bookService.toggleIsQuoteFavourite(quote).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error updating quote isFavourite in API:', error);
      }
    });
  }

  toggleAddBookForm() {
    this.addingBook = !this.addingBook;
  }

  onBookAdded(newBook: Book) {
    this.books.push(newBook);
  }
}
