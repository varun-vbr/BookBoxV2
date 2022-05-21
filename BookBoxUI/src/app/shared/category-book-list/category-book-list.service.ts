import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';

@Injectable()
export class CategoryListingService{

  public categoryBookList: Book[] = [];


  constructor(private http: HttpClient) {

  }

  listBooks(categoryId: number){
     this.http.get('https://bookserviceapi.loca.lt/books/category/' + categoryId, {headers:new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')}).
     subscribe((books: any) => {
       console.log(books)
       this.categoryBookList.length = 0;
       books.forEach((book : any) => {
         this.categoryBookList.push({id : book.bookId, title : book.title, description : book.description, author : book.author.authorName, publisher : book.publisher.publisherName, imageUrl : book.imgLoc, categoryName : book.category.categoryName, bookUrl: book.category.location + book.location});
       })
      });
  }
}
