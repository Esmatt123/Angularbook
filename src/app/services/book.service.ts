import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, Quote } from '../models/book.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'https://angularbook-hdbufdg9g3cubadc.swedencentral-01.azurewebsites.net/api'; // Replace with your actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks(): Observable<Book[]> {
    // Get the JWT token from your authentication service (replace this with your actual logic)
    const authToken = this.authService.getAuthToken();

    // Create request options with headers
    const httpOptions = {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${authToken}` // Add the Authorization header with JWT bearer token
      }),
    };

    // Make the GET request with custom headers
    return this.http.get<Book[]>(`${this.baseUrl}/book`, httpOptions);
  }


  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/book`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/book/${book.id}`, book);
  }

  deleteBook(book: Book): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/book/${book.id}`);
  }

  getQuotesForBook(book: Book): Quote[] {
    return book.quotes;
  }

  addQuoteToBook(quoteId: string, text: string, pageNumber: number, bookTitle: string, isFavourite: boolean): Observable<Quote> {
    const url = `${this.baseUrl}/quote`;

    const quote: Quote = {
      quoteId: quoteId,
      text: text,
      pageNumber: pageNumber,
      bookTitle: bookTitle,
      isFavourite: isFavourite
    };

    return this.http.post<Quote>(url, quote);
  }

  updateQuote(quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.baseUrl}/quote/${quote.quoteId}`, quote);
  }

  deleteQuote(quote: Quote): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/quote/${quote.quoteId}`);
  }

  toggleIsQuoteFavourite(quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.baseUrl}/quote/toggle-favourite/${quote.quoteId}`, quote);
  }

  getFavouriteQuotes(): Observable<Quote[]> {
    const authToken = this.authService.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${authToken}` // Add the Authorization header with JWT bearer token
      }),
    };
    return this.http.get<Quote[]>(`${this.baseUrl}/quote/favourite`, httpOptions);
  }
}
