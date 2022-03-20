import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../../../app/models/userDetails.model'

@Injectable()
export class LoginService {

  public userDetails : UserDetails = {id : -1, username : '', email : '', token : ''  };

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string){
     return this.http.post('http://localhost:3002/api/v1/user/login', {email, password})
  }

}
