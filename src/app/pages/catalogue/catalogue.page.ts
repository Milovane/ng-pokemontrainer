import { Component } from '@angular/core';
import { PokemonBasic } from 'src/app/models/pokemon.model';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-catalogue.page',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
//Pokemon catalogue lists all existing pokemons
export class CataloguePage {
  constructor(private readonly pokeApiService: PokeapiService) {}

  //Pokemon information fetched using api
  get pokemons(): PokemonBasic[] {
    return this.pokeApiService.pokemons;
  }

  //Loading when the api communication is in progress
  get loading(): boolean {
    return this.pokeApiService.loading;
  }
}
