import { Component } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-trainer.page',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {
  constructor(
    private readonly userService: UserService,
    private readonly pokeApiService: PokeapiService
  ) {}

  get user(): User | undefined {
    return this.userService.user;
  }

  get userPokemons(): PokemonBasic[] {
    if (this.user === undefined) {
      console.log('ündef user');

      return [];
    }

    const userPokemonsString: string[] = this.user.pokemon;
    const userPokemonsObj: PokemonBasic[] = [];

    for (let i = 0; i < userPokemonsString.length; i++) {
      const pokemon = this.pokeApiService.findPokemonByName(
        userPokemonsString[i]
      );
      if (pokemon !== undefined) {
        userPokemonsObj.push(pokemon);
      }
    }

    return userPokemonsObj;
  }

  get loading(): boolean {
    return this.pokeApiService.loading;
  }
}
