import { Injectable } from '@angular/core';
import { BookServiceI } from '../bookI.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../../model/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService implements BookServiceI {

  private apiURL= "http://localhost:8080/rest/api/books"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  errorHandler(exception:any) {

    let errorMessage = '';
    
    if(exception.error instanceof ErrorEvent) {
      errorMessage = exception.error.message;
    } else {
      errorMessage = `Error Isbn: ${exception.status}\nMessage: ${exception.message}`;
    }
    return throwError(()=>new Error(errorMessage));
 }

  getBook(): Observable<any> {
    return this.httpClient.get(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }
  getBookByIsbn(isbn: string): Observable<any> {
    return this.httpClient.get(this.apiURL + '/isbn/' + isbn)

  .pipe(
    catchError(this.errorHandler)
  )
    
  }
  saveBook(book: Book): Observable<any> {
    return this.httpClient.post(this.apiURL,JSON.stringify(book),this.httpOptions)

  .pipe(
    catchError(this.errorHandler)
  )

  }
  updateBook(book: Book): Observable<any> {
    
    return this.httpClient.put(this.apiURL,JSON.stringify(book),this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
  removeBookByIsbn(isbn: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/isbn/' + isbn)

    .pipe(
      catchError(this.errorHandler)
    )
  }
}
