import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BookReadPageComponent } from './components/book-read-page/book-read-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BookListComponent } from './shared/book-list/book-list.component';
import { CategoryBookListComponent } from './shared/category-book-list/category-book-list.component';

const routes: Routes = [{path: '', component: CategoryBookListComponent},
                        {path: 'book', component: BookPageComponent},
                        {path: 'history', component: HistoryPageComponent},
                        {path: 'login', component: LoginPageComponent},
                        {path: 'read', component: BookReadPageComponent},
                        {path: 'booklist', component: BookListComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
