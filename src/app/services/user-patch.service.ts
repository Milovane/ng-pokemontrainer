import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokeapiService } from './pokeapi.service';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.models';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root',
})
export class UserPatchService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly pokeapiService: PokeapiService
  ) {}

  public addToCollection(pokemonName: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('addToCollection: There is no user');
    }
    const user: User = this.userService.user;
    const pokemon: string | undefined =
      this.pokeapiService.findPokemonByName(pokemonName)?.name;
    if (!pokemon) {
      throw new Error('addToCollection: No pokemon with name: ' + pokemonName);
    }

    if (this.userService.inOwnedPokemons(pokemonName)) {
      this.userService.removeFromOwnedPokemons(pokemonName);
    } else {
      this.userService.addToOwnedPokemons(pokemonName);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http
      .patch<User>(
        `${apiUsers}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        { headers }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      );
  }
}
