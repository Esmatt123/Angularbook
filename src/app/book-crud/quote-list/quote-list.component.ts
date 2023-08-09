import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/book.model';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent {
  @Input() quotes!: Quote[]; // Add this input property

  constructor() {}

  // Other methods and logic for your component
}