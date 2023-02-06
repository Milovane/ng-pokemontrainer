import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
//Authguard, makes sure that user cant see catalogue and trainer page before being logged in
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userServiceLogin: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userServiceLogin.user) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
