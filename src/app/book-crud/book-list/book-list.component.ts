import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1,
      })),
      state('out', style({
        height: '0',
        opacity: 0,
      })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
  ]
})



export class BookListComponent implements OnInit {
  books: Book[] = [];

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

  

  editBook(book: Book) {

    
    // Implement the logic to edit the book here
    this.bookService.updateBook(book).subscribe({
      next: (updatedBook) => {
        console.log('Book updated:', updatedBook);
        // Reload the books after editing
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error editing book:', error);
      }
    });
  }

  deleteBook(book: Book) {
    // Implement the logic to delete the book here
    this.bookService.deleteBook(book).subscribe({
      next: () => {
        console.log('Book deleted:', book.id);
        // Reload the books after deletion
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error deleting book:', error);
      }
    });
  }

  toggleQuotes(book: Book) {
    // Implement the logic to toggle the visibility of quotes for the book
    book.quotesVisible = !book.quotesVisible;
  }
}