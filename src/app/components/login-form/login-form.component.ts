import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();

  isError: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly userServiceLogin: UserService
  ) {}

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;
    var pattern = new RegExp('^[a-zA-Z0-9]*$');
    if (username !== '') {
      if (pattern.test(username)) {
        this.loginService.login(username).subscribe({
          next: (user: User) => {
            this.userServiceLogin.user = user;
            this.login.emit();
          }, 
          error: () => {
            alert('Login failed');
          },
        });
        
      } else {
        this.isError = true
      }
    } else {
      this.isError = true;
    }
  }
}
  