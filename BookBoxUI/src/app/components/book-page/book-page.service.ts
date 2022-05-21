import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../../models/book.model';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login-page/login-page.service';


@Injectable()
export class BookPageService{

  public book: Book = {
    id: 1,
    title: 'Mastering Knockout JS',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a nisi a ipsum laoreet eleifend eu vitae lorem. Phasellus nisi nisi, pharetra non odio at, maximus pulvinar sapien. Morbi quis mauris a velit euismod dignissim id sit amet velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse porttitor justo sit amet dolor commodo tempus. Aliquam sit amet ligula velit. Nulla nisl quam, fermentum eget turpis sed, tempor molestie sapien. Nunc mattis enim sed metus placerat, vel efficitur justo dictum. Curabitur justo elit, efficitur eu dignissim sed, vulputate sit amet purus. In quis tincidunt augue. Quisque placerat nibh diam, in commodo justo porta eu. Nunc lacus orci, hendrerit vel ultrices sed, porttitor ac metus. Morbi euismod elementum nunc, et sollicitudin orci ornare in. Mauris porttitor libero tortor, at viverra est ultrices a. Morbi quis elit tellus. Praesent mauris est, mattis sed aliquet eu, venenatis ac enim. Curabitur feugiat felis eget vestibulum ornare. Aliquam magna lectus, molestie et metus eu, maximus viverra urna. Praesent est tortor, pellentesque eu efficitur vel, iaculis id diam. Morbi at sapien sit amet ipsum facilisis rutrum. Nam at sem maximus, tristique eros sit amet, consequat massa. Nulla rhoncus dapibus nunc. Phasellus tempus lorem ex, ac tristique nisl pulvinar eget. Maecenas commodo nunc ut mauris euismod, in auctor ante feugiat. Integer hendrerit, ligula quis porttitor sagittis, odio metus mollis ex, quis posuere diam mi id neque. Quisque scelerisque lectus commodo ipsum ultrices, sit amet placerat ligula tempus. Vestibulum pellentesque auctor accumsan. Etiam pretium laoreet pellentesque. Curabitur consectetur massa nec neque commodo tristique. Cras et lacinia mauris. Vestibulum blandit ante ac lectus imperdiet rhoncus. Suspendisse volutpat efficitur metus, in mollis tortor pellentesque ut. Vivamus ullamcorper risus libero. Curabitur condimentum nulla ac ornare mattis. Phasellus vel ipsum at lorem sollicitudin semper a ut arcu. Cras faucibus, metus et laoreet sollicitudin, sem elit rutrum arcu, sed imperdiet purus magna non metus.',
    author: 'Timothy',
    publisher: 'PAKT',
    imageUrl: 'I1.jpg',
    categoryName: 'Computing',
    bookUrl:""
  };

  type = "";

  books : Book[] = [];


  constructor(private http: HttpClient) {

  }

  getReviews(bookId: number){
    return this.http.get('http://userreviewserviceapi.loca.lt/api/v1/users/review/' + bookId, { headers:new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')});
  }

  postReview(review : {userId: number,
  userName: string,
  bookId: number,
  bookName: string,
  rating: number,
  review: string,
  token:string}){
    return this.http.post('http://userreviewserviceapi.loca.lt/api/v1/users/review', review, { headers: new HttpHeaders().append('Bypass-Tunnel-Reminder', 'true')});
  }
}
