import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { SearchService } from 'src/app/shared/searchbar/searchbar.service';
import { LoginService } from '../login-page/login-page.service';
import { HistoryService } from './history-page.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  @Input("books") books : Book[] = [];
  @Input("allowdelete") allowdelete : boolean = false;
  constructor(private  historyService: HistoryService, private loginService: LoginService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.searchResults = this.historyService.history;
  }

}
