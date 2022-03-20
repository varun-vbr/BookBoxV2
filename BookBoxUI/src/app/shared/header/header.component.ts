import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/components/history-page/history-page.service';
import { LoginService } from 'src/app/components/login-page/login-page.service';
import { UserDetails } from 'src/app/models/userDetails.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: any = undefined;
  constructor(private router: Router, private loginService: LoginService, private historyService: HistoryService) {
    this.userName = loginService.userDetails.username;
  }

  ngOnInit(): void {
  }

  gotoLoginPage(): void {
    this.router.navigate(['/login']);
  }

  gotohomePage(){
    this.router.navigate(['']);
  }

  gotoreadhistory(){
    this.historyService.fetchUserHistory(this.loginService.userDetails.id);
    this.router.navigate(['/history']);
  }

  signOut(){
    this.userName = undefined;
    this.loginService.userDetails = {id : -1, username : '', email : '', token : ''  };
    this.router.navigate(['']);
  }

}
