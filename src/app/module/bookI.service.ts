import { Observable } from "rxjs";
import { Book } from "../model/book.model";
import { InjectionToken } from "@angular/core";

export const book_service_token= new InjectionToken<BookServiceI>('book_service_token')

export interface BookServiceI{


    getBook(): Observable<any>;
    getBookByIsbn(isbn:string): Observable<any>;
    saveBook(book : Book): Observable<any>;
    updateBook(book : Book): Observable<any>;
    removeBookByIsbn(isbn:string): Observable<any>


}