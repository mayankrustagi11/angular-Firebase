import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(public authService:AuthService, public router:Router, public flashMessagesService:FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(res => {
      this.flashMessagesService.show('Logged in Successfully!', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessagesService.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
    });
  }

}
