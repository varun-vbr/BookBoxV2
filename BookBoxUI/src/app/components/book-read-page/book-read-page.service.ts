import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../../models/book.model';

@Injectable()
export class BookReadService{

public title: string = "A Question of Inheritance";
public bookPath: string = "/actualbooks/Action_and_Adventure/A_Question_of_Inheritance.pdf";
public bookId: number = 1;
public userId: number = 1;
public bookContent: {pageNumber: number, totalPages: number, content: string} = {pageNumber: 1, totalPages: 1, content: ""};

constructor(private http: HttpClient) {

}

getBookContent(){
  this.http.get("http://bookreadserviceapi.loca.lt/reader/book?bookId=" + this.bookId + "&userId=" + this.userId + "&path=" + this.bookPath, {headers:new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')}).
  subscribe((content: any) => {
    this.bookContent.pageNumber = content.pageNumber;
    this.bookContent.content = content.content;
    this.bookContent.totalPages = content.totalPages;
  });
}

getPage(pageNumber: number){
  this.http.get("http://bookreadserviceapi.loca.lt/reader/page?path=" + this.bookPath + "&pageNumber=" + pageNumber, {headers:new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')}).subscribe((content: any) => {
    this.bookContent.pageNumber = content.pageNumber;
    this.bookContent.content = content.content;
    this.bookContent.totalPages = content.totalPages;
  });
 }
}
