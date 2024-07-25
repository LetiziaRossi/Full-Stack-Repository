import { Component, inject, OnInit } from '@angular/core';
import { book_service_token, BookServiceI } from '../../bookI.service';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../model/book.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  providers:[{provide:book_service_token,useClass:BookService}],
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit{

  book!:Book;

  isbn!:string;

  form!:FormGroup;

  private bookService =inject<BookServiceI>(book_service_token);

  constructor(private router : Router,private route:ActivatedRoute){

  }

  submit() {

    this.bookService.updateBook(this.form.value).subscribe((res: any) => {
      console.log('Book updated successfully!');
      this.router.navigateByUrl('book/index');
    })

  }


  ngOnInit(): void {
  
    this.isbn = this.route.snapshot.params['isbn'];

    this.bookService.getBookByIsbn(this.isbn).subscribe((data) => {
 
      this.book = data;
      console.log(this.book);

    });

    this.form = new FormGroup({
      isbn: new FormControl(''),
      title: new FormControl(''),
      genre: new FormControl(''),
      published: new FormControl()
    });
  
  }


}


