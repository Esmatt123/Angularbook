import { Component, OnInit } from "@angular/core";
import { Book, Quote } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";

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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    );
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
    this.bookService.updateBook(updatedBook).subscribe(
      () => {
        console.log('Book updated in the database:', updatedBook);
  
        // Assuming you want to update the books list and close the modal
        this.loadBooks(); // Update the books list with fresh data
        this.closeEditModal(); // Close the modal
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  } 

  toggleIsFavourite(quote: Quote) {
    this.bookService.toggleIsQuoteFavourite(quote).subscribe(
      (updatedQuote) => {
        quote.isFavourite = updatedQuote.isFavourite;
      },
      (error) => {
        console.error('Error toggling isFavourite:', error);
      }
    );
  }

  
}
