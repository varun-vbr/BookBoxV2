import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookPageService } from 'src/app/components/book-page/book-page.service';
import { Book } from '../../models/book.model';
import { SearchService } from '../searchbar/searchbar.service';
import { CategoryListingService } from '../category-book-list/category-book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [CategoryListingService]
})
export class BookListComponent implements OnInit {
  @Input("books") books : Book[] = [];
  @Input("allowdelete") allowdelete : boolean = false;
  type : string = "";
  constructor(private searchService: SearchService, private bookPageService: BookPageService, private router: Router, private categoryListingService: CategoryListingService){ }

  ngOnInit(): void {
    this.books = this.searchService.searchResults;
    this.type = this.bookPageService.type;
  }

  gotoBookPage(book: Book): void {
    this.bookPageService.book = book;
    this.router.navigate(['/book']);
  }

  getSearchResults(selectedItem: string, selectedType: string){
    this.searchService.search(selectedItem, selectedType);
    this.type = selectedItem;
    this.books = this.searchService.searchResults;
    //this.router.navigate(['/self'])
  }

  getCategoryDetails(categoryId: number): void {
    this.categoryListingService.listBooks(categoryId);
    this.books = this.categoryListingService.categoryBookList;
  }

  getCategoryBooks(categoryName: string){
    this.type = "";
      if(categoryName == "Action and Adventure"){
        this.getCategoryDetails(1);
      } else if(categoryName == "Autobiographies and Biographies"){
        this.getCategoryDetails(2);
      } else if(categoryName == "Business and Economics"){
        this.getCategoryDetails(3);
      } else if(categoryName == "Computing"){
        this.getCategoryDetails(4);
      } else if(categoryName == "Healthy Living"){
        this.getCategoryDetails(5);
      } else if(categoryName == "Humour"){
        this.getCategoryDetails(6);
      } else if(categoryName == "Personal Development"){
        this.getCategoryDetails(7);
      } else if(categoryName == "Romance"){
        this.getCategoryDetails(8);
      } else if(categoryName == "Science and Technology"){
        this.getCategoryDetails(9);
      } else if(categoryName == "Science Fiction"){
        this.getCategoryDetails(10);
      } else if(categoryName == "Sports"){
        this.getCategoryDetails(11);
      } else if(categoryName == "Travel"){
        this.getCategoryDetails(12);
      }
  }
}
