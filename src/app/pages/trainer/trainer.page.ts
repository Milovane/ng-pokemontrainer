import { Component } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import { PokemonBasic } from 'src/app/models/pokemon.model';
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

  //Get the information of the pokemons in the user's inventory (combine values with keys)
  get userPokemons(): PokemonBasic[] {
    if (this.user === undefined) {
      return [];
    }

    const userPokemonsString: string[] = this.user.pokemon; //user object values as keys
    const userPokemonsObj: PokemonBasic[] = [];

    //Find and collect the values using the user object values (pokemon names) as keys
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

  //True when the api communication is in progress
  get loading(): boolean {
    return this.pokeApiService.loading;
  }
}
