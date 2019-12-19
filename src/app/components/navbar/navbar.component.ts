import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(public authService:AuthService, public router:Router, public flashMessagesService:FlashMessagesService, public settingsService:SettingsService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });

  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('Loged Out Successfully!', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  } 

}
