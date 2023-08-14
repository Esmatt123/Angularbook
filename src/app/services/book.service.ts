import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, Quote } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'http://localhost:5010/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/book`);
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
    return this.http.get<Quote[]>(`${this.baseUrl}/quote/favourite`);
  }
}
