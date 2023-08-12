import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

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
  @Input() display: string = 'none';
  @Output() save = new EventEmitter<Book>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private bookService: BookService) {}

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
}
