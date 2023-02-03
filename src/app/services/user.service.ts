import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonBasic } from '../models/pokemon.model';
import { User } from '../models/user.models';
import { StorageUtil } from '../utils/storage.utils';

// Code is based on video 6. Used to save user in session storage.

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  public inOwnedPokemons(pokemonName: string): boolean {
    if (this.user) {
      return Boolean(
        this.user.pokemon.find((pokemon: string) => pokemon === pokemonName)
      );
    }
    return false;
  }

  public addToOwnedPokemons(pokemonName: string): void {
    if (this._user) this._user.pokemon.push(pokemonName);
  }

  public removeFromOwnedPokemons(pokemonName: string): void {
    if (this._user)
      this._user.pokemon = this._user.pokemon.filter(
        (name: string) => name !== pokemonName
      );
  }
}
