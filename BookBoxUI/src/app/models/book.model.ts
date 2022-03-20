export class Book{
 public id: number;
 public title: string;
 public description: string;
 public author: string;
 public publisher: string;
 public imageUrl: string;
 public categoryName : string;
 public bookUrl: string;

 constructor(id: number, title: string, description: string, author: string, publisher: string, imageUrl: string, categoryName: string, bookUrl: string) {
   this.id = id;
   this.title = title;
   this.description = description;
   this.author = author;
   this.publisher = publisher;
   this.imageUrl = imageUrl;
   this.categoryName = categoryName;
   this.bookUrl = bookUrl;
 }
}
