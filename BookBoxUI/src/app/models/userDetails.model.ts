export class UserDetails{
  public id:number;
  public username:string;
  public email:string;
  public token:string;

  constructor(id:number, username:string, email:string, token:string){
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
  }
}
