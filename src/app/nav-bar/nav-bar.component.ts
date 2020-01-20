import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;
  email: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userService.afAuth.authState.subscribe(data => {
      if (data) {
        this.userService.getUserData(data.email).subscribe(user => {
          if (user) {
            this.isAuthenticated = true;
            this.email = user.email;
          }
          if (user.role === 'admin') {
            this.isAdmin = true;
          }
        });
      }
    });
  }

  /*emailView(): string {
    this.userService.afAuth.authState.subscribe(data => {
      if (data) {
        this.userService.getUserData(data.email).subscribe(user => {
          if (user) {
            return user.email;
          }
        });
      }
    });
    return '';
  }*/

  logout() {
    this.userService.signOutUser().then(() => this.router.navigateByUrl('/Logging'));
  }
}
