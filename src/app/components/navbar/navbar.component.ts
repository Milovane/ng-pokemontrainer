import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserServiceLoginTsService } from 'src/app/services/user.service.login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  get user(): User | undefined {
    return this.userLoginService.user;
  }

  constructor(
    private readonly userLoginService: UserServiceLoginTsService
    ) { }

    ngOnInit(): void {
      
    }
}
