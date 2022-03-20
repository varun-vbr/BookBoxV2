import { Component, Input } from '@angular/core';
import { SearchService } from './shared/searchbar/searchbar.service'
import { Book } from './models/book.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input("books") books : Book[] = [];
  @Input("allowdelete") allowdelete : boolean = false;
   constructor(private searchService: SearchService){

   }

   ngOnInit(): void {
     //this.books = this.searchService.searchResults;
   }


}
