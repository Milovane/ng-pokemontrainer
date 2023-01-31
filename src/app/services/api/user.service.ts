import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  private readonly _user$: BehaviorSubject<User[]> = new BehaviorSubject<
    User[]
  >([]);

  get user$(): Observable<User[]> {
    return this._user$.asObservable();
  }

  public fetchUser(): void {
    this.http
      .get<User[]>(
        'https://noroff-assignment-api-production-b782.up.railway.app/trainers?username=ash'
      )
      .subscribe({
        next: (user: User[]) => {
          console.log(user[0]);
          this._user$.next(user);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }
}

export interface User {
  id: number;
  username: string;
  pokemon: [];
}
