import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { SearchService } from './searchbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchBooksCtrl = new FormControl();
  searchType = new FormControl();
  options: {title : string}[] = [{title:'One'},{ title:'Two' }, {title:'Three'}];
  filteredItems:any = [];
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedItem: any = "";
  selectedType: any = "book";
  constructor(
    private http: HttpClient, private searchService: SearchService, private router: Router
  ) { }

  clearSelection() {
    this.selectedItem = "";
  }

  ngOnInit(): void {

    // this.filteredItems = this.searchBooksCtrl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
    this.searchBooksCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredItems = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('http://localhost:8081/bookSearch/search?type='+this.selectedType+'&key='+value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.filteredItems = [];
        } else {
          this.errorMsg = "";
          if(this.selectedType == "book"){
            this.filteredItems = data;
          } else if(this.selectedType == "author"){
            this.filteredItems.length = 0;
            for(let i = 0; i < data.length; i++){
              let dataItem : any =  {};
              dataItem.title = data[i].authorName;
              this.filteredItems.push(dataItem);
            }
          } else if(this.selectedType == "publisher"){
              this.filteredItems.length = 0;
              for(let i = 0; i < data.length; i++){
                let dataItem : any =  {};
                dataItem.title = data[i].publisherName;
                this.filteredItems.push(dataItem);
            }
          }
        }
        console.log(this.filteredItems);
      });

  }

  private _filter(value: string): {title:string}[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  getSearchResults(){
    this.searchService.search(this.selectedItem, this.selectedType);
    this.router.navigate(['/booklist'])
  }

}
