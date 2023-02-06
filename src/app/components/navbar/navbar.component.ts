import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  get user(): User | undefined {
    return this.userLoginService.user;
  }

  constructor(private readonly userLoginService: UserService) {}

  ngOnInit(): void {}

  //Logout function that clear session storage and updates page
  logout() {
    sessionStorage.clear();
    location.reload();
  }
}
