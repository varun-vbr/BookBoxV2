import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  email:string ="";
  password:string ="";
  errorMsg: string = "";
  isError:boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  signIn(){
    this.loginService.login(this.email, this.password).
    subscribe((user:any) => {
      console.log(user);
      this.loginService.userDetails.token = user.token;
      this.loginService.userDetails.id = user.data.userDetail.userId;
      this.loginService.userDetails.email = user.data.userDetail.email;
      this.loginService.userDetails.username = user.data.userDetail.name;
      this.isError = false;
      this.errorMsg = "";
      console.log(this.loginService.userDetails);
      this.router.navigate(['']);
   },(error:any) => {
       console.log(error.error.message);
       this.errorMsg = error.error.message;
       this.isError = true;
   });
  }
  ngOnInit(): void {
  }

  gotohomePage(){
    this.router.navigate(['']);
  }

}
