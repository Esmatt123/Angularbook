import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Book, Quote } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { DayNightModeService } from 'src/app/services/sharedDayAndNightMode.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  @Input() editedBook: Book = {
    id: '',
    title: '',
    author: '',
    publishDate: '',
    quotes: [],
    quotesVisible: false
  };

  newQuote: Quote = {
    quoteId: '',
    text: '',
    pageNumber: 0,
    bookTitle: '',
    isFavourite: false
  };

  isAddQuoteVisible: boolean = false;

  get isDayMode(): boolean {
    return this.dayNightModeService.isDayMode;
  }

  @Input() display: string = 'none';
  @Output() save = new EventEmitter<Book>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private bookService: BookService, protected dayNightModeService: DayNightModeService) {}

  saveEdit() {
    this.bookService.updateBook(this.editedBook).subscribe(
      (updatedBook) => {
        console.log('Book updated:', updatedBook);
        this.save.emit(updatedBook);
        this.close.emit(); // Emit the close event to parent component
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }

  addNewQuote() {
    const newQuote: Quote = {
      quoteId: '',
      text: this.newQuote.text,
      pageNumber: this.newQuote.pageNumber,
      bookTitle: this.editedBook.title,
      isFavourite: this.newQuote.isFavourite
    };
    this.editedBook.quotes.push(newQuote);
    this.newQuote = {
      quoteId: '',
      text: '',
      pageNumber: 0,
      bookTitle: '',
      isFavourite: false
    };
    this.isAddQuoteVisible = false;
  }

  isBookTitleInvalid(): boolean {
    return this.newQuote.bookTitle !== this.editedBook.title;
  }

  toggleAddQuoteForm() {
    this.isAddQuoteVisible = !this.isAddQuoteVisible;
  }

  removeQuote(index: number) {
    this.editedBook.quotes.splice(index, 1);
  }
}
