import { Component, inject, OnInit } from '@angular/core';
import { book_service_token, BookServiceI } from '../../bookI.service';
import { Book } from '../../../model/book.model';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  providers:[{provide:book_service_token,useClass:BookService}],
  imports: [CommonModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  private bookService =inject<BookServiceI>(book_service_token);

  book : Book [] = [];

  getBook(): void {

    this.bookService.getBook().subscribe({
      next: (res) => {
        this.book = res;
        console.log('Data fetched successfully', res);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  removeBook(isbn: string) {

    this.bookService.removeBookByIsbn(isbn).subscribe(res => {
      console.log(res.data);
      this.getBook();
    });

    

  }


  ngOnInit(): void {
    
   this.getBook(); 
  }

}
