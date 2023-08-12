import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Quote } from 'src/app/models/book.model';

@Component({
  selector: 'app-favorite-quotes',
  templateUrl: './favourite-quotes-page.component.html',
  styleUrls: ['./favourite-quotes-page.component.css']
})
export class FavouriteQuotesPageComponent implements OnInit {
  favoriteQuotes: Quote[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Fetch favorite quotes from the service
    this.bookService.getFavouriteQuotes().subscribe(
      (quotes: Quote[]) => {
        this.favoriteQuotes = quotes; // Assign the array of quotes
      },
      (error) => {
        console.error('Error loading favorite quotes:', error);
      }
    );
  }
}
