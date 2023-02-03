import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonBasic } from 'src/app/models/pokemon.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-catalogue.page',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  constructor(private readonly pokeApiService: PokeapiService) {}

  get pokemonCollection$(): Observable<PokemonBasic[]> {
    return this.pokeApiService.pokemonCollection$;
  }

  get pokemonCollection(): PokemonBasic[] {
    return this.pokeApiService.pokemonCollection;
  }

  get pokemons(): PokemonBasic[] {
    return this.pokeApiService.pokemons;
  }

  get loading(): boolean {
    return this.pokeApiService.loading;
  }

  ngOnInit(): void {}
}
