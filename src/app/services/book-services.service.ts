import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServices {

  private AppUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  // Get all books
  getBooks(): Observable<any> {
    return this.http.get(this.AppUrl + 'books');
  }

  // Get book by id
  getBookById(id: string): Observable<any> {
    return this.http.get(this.AppUrl + 'books/' + id);
  }

  // Update book
  updateBook(id: string, stock: number): Observable<any> {
    return this.http.put(this.AppUrl + 'books/' + id, stock);
  }
}
