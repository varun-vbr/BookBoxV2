import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';

@Injectable()
export class SearchService{

  public searchResults: Book[] = [];
  public searchType: string = "";
  constructor(private http: HttpClient) {

  }

  search(query: string, type: string){
     this.http.get('http://booksearchserviceapi.loca.lt/bookSearch/searchResults?type=' + type +'&key='+ query, {headers:new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')}).
     subscribe((books: any) => {
       console.log(books)
       this.searchResults.length = 0;
       this.searchType = ""
       this.searchType = query;
       books.forEach((book : any) => {
         this.searchResults.push({id : book.bookId, title : book.title, description : book.description, author : book.author.authorName, publisher : book.publisher.publisherName, imageUrl : book.imgLoc, categoryName : book.category.categoryName, bookUrl: book.category.location + book.location});
       })
      });
  }
}
