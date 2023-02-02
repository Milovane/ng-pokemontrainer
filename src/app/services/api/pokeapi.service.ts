import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  constructor(private readonly http: HttpClient) {}

  private readonly _pokemon$: BehaviorSubject<PokemonDetails> =
    new BehaviorSubject<PokemonDetails>(null!);

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
    this.http
      .get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .subscribe({
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
    pokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    return pokemon;
  }

  public fetchPokemons(start: number, limit: number): void {
    if (this._pokemonCollection$.value.length > 0) {
      return;
    }
    this._loading = true;

    this.http
      .get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${limit}`
      )
      .pipe(
        //id = obj.url.split('/').slice(-2)[0];
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
        next: (pokemonCollection: PokemonBasic[]) => {
          console.log(pokemonCollection);
          this._pokemonCollection$.next(pokemonCollection);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });

    interface PokemonResponse {
      results: PokemonBasic[];
    }
  }
}
