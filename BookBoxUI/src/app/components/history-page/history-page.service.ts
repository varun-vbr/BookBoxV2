import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/models/book.model';

@Injectable()
export class HistoryService{

  public history: Book[] = [];

  constructor(private http: HttpClient) {

  }

  fetchUserHistory(userId:number):void {
    this.http.get('http://localhost:8082/reader/book/suggestion/' + userId).
     subscribe((books: any) => {
       console.log(books)
       this.history.length = 0;
       books.forEach((book : any) => {
         this.history.push({id : book.bookId, title : book.title, description : book.description, author : book.author.authorName, publisher : book.publisher.publisherName, imageUrl : book.imgLoc, categoryName : book.category.categoryName, bookUrl: book.category.location + book.location});
       })
      });
  }
}
