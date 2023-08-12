import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent {
  @Input() quotes!: Quote[]; // Add this input property

  constructor(private bookService: BookService) {}

  // Other methods and logic for your component

  toggleQuoteIsFavourite(quote: Quote) {
    this.bookService.toggleIsQuoteFavourite(quote).subscribe({
      next: () => {
        console.log('Quote isFavourite updated in API');
      },
      error: (error) => {
        console.error('Error updating quote isFavourite in API:', error);
        // Handle the error as needed
      }
  });
  }
  
}