import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, MessageService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,     
              private messageService: MessageService, 
              private router: Router) { }

  ngOnInit(): void {
    
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserName() {
    return this.authService.getUserName();
  }

  isUserActive() {
    return this.authService.isUserActive();
  }

  onClick() {
  }

  onSignOut() {
    this.authService.signOut(this.authService.getAuthString(), this.authService.getUserId())
    .subscribe((res)=>{
      console.log("Signed out!");      

      // Going to home page
      this.router.navigateByUrl('home');
    });    
  } 
}