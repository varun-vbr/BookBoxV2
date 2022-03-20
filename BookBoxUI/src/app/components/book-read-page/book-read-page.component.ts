import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookReadService } from './book-read-page.service';

@Component({
  selector: 'app-book-read-page',
  templateUrl: './book-read-page.component.html',
  styleUrls: ['./book-read-page.component.css']
})
export class BookReadPageComponent implements OnInit {
  bookContent: {title:string, pageNumber: number, totalPages: number, content: string} = {title:"", pageNumber: 1, totalPages: 1, content: ""};
  constructor( private bookReadService: BookReadService, private router: Router) { }

  ngOnInit(): void {
    this.bookReadService.getBookContent();
    this.bookContent.pageNumber = this.bookReadService.bookContent.pageNumber;
    this.bookContent.content = this.bookReadService.bookContent.content;
    this.bookContent.totalPages = this.bookReadService.bookContent.totalPages;
    this.bookContent.title = this.bookReadService.title;
  }

  getNextPage(): void {
    this.bookReadService.getPage(this.bookContent.pageNumber + 1);
    this.bookContent.pageNumber = this.bookReadService.bookContent.pageNumber;
    this.bookContent.content = this.bookReadService.bookContent.content;
    this.bookContent.totalPages = this.bookReadService.bookContent.totalPages;
  }

  getPreviousPage(): void {
    this.bookReadService.getPage(this.bookContent.pageNumber - 1);
    this.bookContent.pageNumber = this.bookReadService.bookContent.pageNumber;
    this.bookContent.content = this.bookReadService.bookContent.content;
    this.bookContent.totalPages = this.bookReadService.bookContent.totalPages;
  }

  back(): void {
    this.router.navigate(['/book'])
  }

}
