import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Quote } from 'src/app/models/book.model';
import { DayNightModeService } from '../services/sharedDayAndNightMode.service';

@Component({
  selector: 'app-favourite-quotes',
  templateUrl: './favourite-quotes-page.component.html',
  styleUrls: ['./favourite-quotes-page.component.css']
})
export class FavouriteQuotesPageComponent implements OnInit {
  favoriteQuotes: Quote[] = [];
  get isDayMode(): boolean{
    return this.dayNightModeService.isDayMode
  }
  constructor(private bookService: BookService, private dayNightModeService: DayNightModeService) {}

  ngOnInit(): void {
    // Fetch favorite quotes from the service
    this.bookService.getFavouriteQuotes().subscribe({
      next: (quotes: Quote[]) => {
        this.favoriteQuotes = quotes; // Assign the array of quotes
      },
      error:(error) => {
        console.error('Error loading favorite quotes:', error);
      }
  });
  }
}
