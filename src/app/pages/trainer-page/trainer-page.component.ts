import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  get user$(): Observable<User[]> {
    return this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.fetchUser();
  }
}
