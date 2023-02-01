import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceLoginTsService } from 'src/app/services/user.service.login.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();

  //This constructor uses userServiceLogin (Temporary service as to not ruin rest of code)
  constructor(
    private readonly loginService: LoginService,
    private readonly userServiceLogin: UserServiceLoginTsService
  ) {}

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (user: User) => {
        this.userServiceLogin.user = user;
        this.login.emit();
      },
      error: () => {},
    });
  }
}
