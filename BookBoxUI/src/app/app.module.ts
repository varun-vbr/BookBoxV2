import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from './shared/searchbar/searchbar.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { BookListComponent } from './shared/book-list/book-list.component';
import { SearchService } from './shared/searchbar/searchbar.service';
import { CategoryBookListComponent } from './shared/category-book-list/category-book-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginService } from './components/login-page/login-page.service';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BookPageService } from './components/book-page/book-page.service';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { BookReadPageComponent } from './components/book-read-page/book-read-page.component';
import { CookieService } from 'ngx-cookie-service';
import { BookReadService } from './components/book-read-page/book-read-page.service';
import { HistoryService } from './components/history-page/history-page.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    HeaderComponent,
    BookListComponent,
    CategoryBookListComponent,
    LoginPageComponent,
    BookPageComponent,
    HistoryPageComponent,
    BookReadPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'jwt',
    headerName: 'Cookies',
  }),
  ],
  providers: [
    SearchService,
    LoginService,
    BookPageService,
    CookieService,
    BookReadService,
    HistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
