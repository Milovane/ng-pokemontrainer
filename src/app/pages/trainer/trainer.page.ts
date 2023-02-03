import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UserService } from 'src/app/services/user.service';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-trainer.page',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly pokeApiService: PokeapiService
  ) {}

  get user(): User | undefined {
    return this.userService.user;
  }

  get userPokemons(): PokemonBasic[] {
    if (this.user === undefined) {
      return [];
    }

    const userPokemonsString: String[] = this.user.pokemon;
    const pokeArr: PokemonBasic[] = this.pokeApiService.pokemonCollection;
    const userPokemonsObj: PokemonBasic[] = [];

    for (let i = 0; i < userPokemonsString.length; i++) {
      const obj = pokeArr.find((x) => x.name === userPokemonsString[i]);
      if (obj !== undefined) {
        const pokemon: PokemonBasic = {
          name: obj.name,
          imgUrl: obj.imgUrl,
          url: obj.url,
          id: obj.id,
        };
        userPokemonsObj.push(pokemon);
      }
    }

    return userPokemonsObj;
  }

  get pokemon$(): Observable<PokemonDetails> {
    return this.pokeApiService.pokemon$;
  }

  get loading(): boolean {
    return this.pokeApiService.loading;
  }

  ngOnInit(): void {
    //this.pokeApiService.fetchPokemonDetails('charmeleon');
  }
}
