import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  @Input() book: Book | undefined;
  @Output() saveBook: EventEmitter<Book> = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      publishDate: ['']
    });
  }

  ngOnChanges() {
    if (this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        publishDate: this.book.publishDate
      });
    }
  }

  onSave() {
    const editedBook: Book = {
      id: this.book ? this.book.id : '',
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      publishDate: this.bookForm.value.publishDate,
      quotes: this.book ? this.book.quotes : [],
      quotesVisible: false
    };

    this.saveBook.emit(editedBook);
    this.bookForm.reset();
  }
}
