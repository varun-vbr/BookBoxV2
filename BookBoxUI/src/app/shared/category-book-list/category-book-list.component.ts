import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookPageService } from 'src/app/components/book-page/book-page.service';
import { Book } from 'src/app/models/book.model';
import { CategoryListingService } from './category-book-list.service';

@Component({
  selector: 'app-category-book-list',
  templateUrl: './category-book-list.component.html',
  styleUrls: ['./category-book-list.component.css'],
  providers: [CategoryListingService]
})
export class CategoryBookListComponent implements OnInit {

  categoryDetails: Book[] = [];
  constructor(private categoryListingService: CategoryListingService,
    private bookPageService: BookPageService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryListingService.listBooks(1);
    this.categoryDetails = this.categoryListingService.categoryBookList;
  }

  getCategoryDetails(categoryId: number): void {
    this.categoryListingService.listBooks(categoryId);
    this.categoryDetails = this.categoryListingService.categoryBookList;
  }

  gotoBookPage(book: Book): void {
    this.bookPageService.book = book;
    this.router.navigate(['/book']);
  }

}
