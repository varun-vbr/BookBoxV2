import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books : {title: string, author: string, publisher: string}[] = [{title: "ABC", author: "ABC", publisher: "ABC"}, {title: "ABC", author: "ABC", publisher: "ABC"}];
  constructor() { }

  ngOnInit(): void {
  }

}
