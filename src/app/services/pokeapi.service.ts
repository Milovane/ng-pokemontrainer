import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';
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
    //this._pokemons =
    //StorageUtil.storageRead<PokemonBasic[]>(StorageKeys.PokemonData) ?? [];
  }

  private set pokemons(pokemons: PokemonBasic[]) {
    StorageUtil.storageSave<PokemonBasic[]>(StorageKeys.PokemonData, pokemons!);
    this._pokemons = pokemons;
  }

  private readonly _pokemon$: BehaviorSubject<PokemonDetails> =
    new BehaviorSubject<PokemonDetails>(null!);

  get pokemons(): PokemonBasic[] {
    return this._pokemons;
  }

  get pokemon$(): Observable<PokemonDetails> {
    return this._pokemon$.asObservable();
  }

  private readonly _pokemonCollection$: BehaviorSubject<PokemonBasic[]> =
    new BehaviorSubject<PokemonBasic[]>([]);

  get pokemonCollection$(): Observable<PokemonBasic[]> {
    return this._pokemonCollection$.asObservable();
  }

  get pokemonCollection(): PokemonBasic[] {
    return this._pokemonCollection$.value;
  }

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  public fetchPokemonDetails(pokeName: string): void {
    this.http.get<PokemonDetails>(`${apiPokemons}/${pokeName}`).subscribe({
      next: (pokemon: PokemonDetails) => {
        this._pokemon$.next(pokemon);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  private setProperties(pokemon: PokemonBasic) {
    pokemon.id = +pokemon.url.split('/').slice(-2)[0];
    pokemon.imgUrl = `${pokemonImgBaseUrl}/${pokemon.id}.png`;
    return pokemon;
  }

  private getPokemonIdFromName(pokemonName: string): number {
    let pokeArr: PokemonBasic[] = this.pokemonCollection;
    const pokemon = pokeArr.find((x) => x.name === pokemonName);

    let id = 0;
    if (pokemon !== undefined) id = +pokemon.url.split('/').slice(-2)[0];
    return id;
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
          this._pokemonCollection$.next(pokemons);
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

  public pokemonByName(name: string): PokemonBasic | undefined {
    return this.pokemonCollection.find(
      (pokemon: PokemonBasic) => pokemon.name === name
    );
  }
}
