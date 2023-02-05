import { Component } from '@angular/core';
import { PokemonBasic } from 'src/app/models/pokemon.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-catalogue.page',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage {
  constructor(private readonly pokeApiService: PokeapiService) {}

  get pokemons(): PokemonBasic[] {
    return this.pokeApiService.pokemons;
  }

  get loading(): boolean {
    return this.pokeApiService.loading;
  }
}
