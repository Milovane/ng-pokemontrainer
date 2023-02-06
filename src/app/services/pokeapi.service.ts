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
  private _pokemons: PokemonBasic[] = []; //all available pokemons from API
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

  //Extract information from API response object
  private setProperties(pokemon: PokemonBasic) {
    pokemon.id = +pokemon.url.split('/').slice(-2)[0];
    pokemon.imgUrl = `${pokemonImgBaseUrl}/${pokemon.id}.png`;
    return pokemon;
  }

  /**
   * Fetch pokemon information from API. Runs only when the information is not available yet.
   * @param start API param - start ID
   * @param limit API param - max number of objects
   * @returns Void, subscription-based function
   */
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

  /**
   * Find a pokemon object from the array of all available pokemons using the pokemon name as a key.
   * @param name Pokemon name
   * @returns Pokemon object
   */
  public findPokemonByName(name: string): PokemonBasic | undefined {
    return this.pokemons.find((pokemon: PokemonBasic) => pokemon.name === name);
  }
}
