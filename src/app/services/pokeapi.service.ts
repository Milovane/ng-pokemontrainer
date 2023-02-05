import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PokemonBasic } from 'src/app/models/pokemon.model';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.utils';
import { StorageKeys } from '../enums/storage-keys.enum';

const { apiPokemons, pokemonImgBaseUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private _pokemons: PokemonBasic[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient) {
    this._pokemons =
      StorageUtil.storageRead<PokemonBasic[]>(StorageKeys.PokemonData) ?? [];
  }

  private set pokemons(pokemons: PokemonBasic[]) {
    StorageUtil.storageSave<PokemonBasic[]>(StorageKeys.PokemonData, pokemons!);
    this._pokemons = pokemons;
  }

  get pokemons(): PokemonBasic[] {
    return this._pokemons;
  }

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  private setProperties(pokemon: PokemonBasic) {
    pokemon.id = +pokemon.url.split('/').slice(-2)[0];
    pokemon.imgUrl = `${pokemonImgBaseUrl}/${pokemon.id}.png`;
    return pokemon;
  }

  public fetchPokemons(start: number, limit: number): void {
    if (this._pokemons.length > 0 || this._loading) {
      return;
    }
    this._loading = true;

    this.http
      .get<PokemonResponse>(`${apiPokemons}/?offset=${start}&limit=${limit}`)
      .pipe(
        map((pokemonResponse: PokemonResponse) => {
          return pokemonResponse.results.map((pokemon) =>
            this.setProperties(pokemon)
          );
        }),
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: PokemonBasic[]) => {
          this.pokemons = pokemons;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this._error = error.message;
        },
      });

    interface PokemonResponse {
      results: PokemonBasic[];
    }
  }

  public findPokemonByName(name: string): PokemonBasic | undefined {
    return this.pokemons.find((pokemon: PokemonBasic) => pokemon.name === name);
  }

  private getPokemonIdFromName(pokemonName: string): number {
    const pokemon = this.pokemons.find((x) => x.name === pokemonName);

    let id = 0;
    if (pokemon !== undefined) id = +pokemon.url.split('/').slice(-2)[0];
    return id;
  }
}
