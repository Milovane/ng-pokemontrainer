import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonBasic } from 'src/app/models/pokemon.model';
import { PokeapiService } from 'src/app/services/api/pokeapi.service';

@Component({
  selector: 'app-catalogue.page',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  constructor(private readonly pokeApiService: PokeapiService) {}

  pokemonImagePath(pokemon: PokemonBasic): string {
    const id = pokemon.url.at(-2);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  get pokemonCollection$(): Observable<PokemonBasic[]> {
    return this.pokeApiService.pokemonCollection$;
  }

  ngOnInit(): void {
    this.pokeApiService.fetchPokemons(0, 5);
  }
}
