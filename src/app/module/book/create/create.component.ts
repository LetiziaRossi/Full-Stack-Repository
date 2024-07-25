import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { book_service_token, BookServiceI } from '../../bookI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  providers:[{provide:book_service_token, useClass:BookService}],
  imports:[CommonModule,ReactiveFormsModule],

  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  
  private router:Router = new Router();

  form!:FormGroup;

  private bookService=inject<BookServiceI>(book_service_token)

  submit() {

    this.bookService.saveBook(this.form.value).subscribe((res: any) => {
      console.log('Book created successfully!');
      this.router.navigateByUrl('book/index');
    })

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      isbn: new FormControl(''),
      title: new FormControl(''),
      genre: new FormControl(''),
      published: new FormControl(0)
    });
    
  }



}

