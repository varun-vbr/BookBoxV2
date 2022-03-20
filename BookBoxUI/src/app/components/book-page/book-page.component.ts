import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UserReview } from 'src/app/models/userReview.model';
import { BookPageService } from './book-page.service';
import { CategoryListingService } from 'src/app/shared/category-book-list/category-book-list.service';
import { SearchService } from 'src/app/shared/searchbar/searchbar.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login-page/login-page.service';
import { BookReadService } from '../book-read-page/book-read-page.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
  providers: [CategoryListingService]
})
export class BookPageComponent implements OnInit {

  constructor(private bookPageService:BookPageService,
              private router: Router,
              private categoryListingService: CategoryListingService,
              private searchService: SearchService,
              private cookieService: CookieService,
              private loginService: LoginService, private bookReadService: BookReadService) { }
  book: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    publisher: '',
    imageUrl: '',
    categoryName: '',
    bookUrl: ''
  };
  reviews:UserReview[] = [];
  addReviewText: string = "";
  ngOnInit(): void {
    this.book.id = this.bookPageService.book.id;
    this.book.title = this.bookPageService.book.title;
    this.book.description = this.bookPageService.book.description;
    this.book.author = this.bookPageService.book.author;
    this.book.publisher = this.bookPageService.book.publisher;
    this.book.imageUrl = this.bookPageService.book.imageUrl;
    this.book.categoryName = this.bookPageService.book.categoryName;
    this.book.bookUrl = this.bookPageService.book.bookUrl;
    this.bookPageService.getReviews(this.book.id).
    subscribe((reviews:any) => {
      this.reviews.length = 0;
      reviews.data.reviews.forEach((review:any) => {
          this.reviews.push({username: review.userName, review: review.review, reviewDate: review.reviewDate});
          console.log(this.reviews);
      });
    });
  }

  getSearchResults(selectedItem: string, selectedType: string){
    this.searchService.search(selectedItem, selectedType);
    //this.type = selectedItem;
    this.bookPageService.type = selectedItem;
    //this.router.navigate(['/self'])
    this.router.navigate(['/booklist']);
  }

  getCategoryDetails(categoryId: number): void {
    this.categoryListingService.listBooks(categoryId);
    this.searchService.searchResults = this.categoryListingService.categoryBookList;
  }

  getCategoryBooks(categoryName: string){
    this.bookPageService.type = "";
    this.searchService.searchResults = [];
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
      this.router.navigate(['/booklist']);
  }

  postReview(){
    if(this.loginService.userDetails.id == -1){
      this.router.navigate(['/login']);
      return;
    }
    const review: {userId: number,
      userName: string,
      bookId: number,
      bookName: string,
      rating: number,
      review: string,
      token: string}  = {userId : this.loginService.userDetails.id, userName : this.loginService.userDetails.username, bookId : this.book.id, bookName : this.book.title, rating : 5, review : this.addReviewText, token: this.loginService.userDetails.token};
    //this.cookieService.set('jwt', this.loginService.userDetails.token);
    this.bookPageService.postReview(review).subscribe((data: any) => {
        this.reviews.push({username: data.data.userReview.userName, review: data.data.userReview.review, reviewDate: data.data.userReview.reviewDate});
        console.log(data);
        this.addReviewText = "";
    })
  }

  readBook(){
    if(this.loginService.userDetails.id == -1){
      this.router.navigate(['/login']);
      return;
    } else{
      this.bookReadService.bookId = this.book.id;
      this.bookReadService.bookPath = this.book.bookUrl;
      this.bookReadService.userId = this.loginService.userDetails.id;
      this.bookReadService.title = this.book.title;
      this.bookReadService.getBookContent();
      this.router.navigate(['/read']);
    }
  }


}
