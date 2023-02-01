import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';
import { map } from 'rxjs/operators';

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

  public fetchPokemonDetails(pokeName: string): void {
    this.http
      .get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .subscribe({
        next: (pokemon: PokemonDetails) => {
          console.log(pokemon);
          this._pokemon$.next(pokemon);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public fetchPokemons(start: number, limit: number): void {
    this.http
      .get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${limit}`
      )
      .pipe(
        map((pokemonResponse: PokemonResponse) => {
          return pokemonResponse.results;
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
