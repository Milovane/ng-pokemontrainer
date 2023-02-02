import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeapiService } from 'src/app/services/api/pokeapi.service';
import { User, UserService } from 'src/app/services/api/user.service';
import { PokemonBasic, PokemonDetails } from 'src/app/models/pokemon.model';

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

  pokemonImagePath(pokemonName: string): string {
    let pokeArr: PokemonBasic[] = this.pokeApiService.pokemonCollection;
    const obj = pokeArr.find((x) => x.name === pokemonName);

    let id;
    if (obj !== undefined) id = obj.url.split('/').slice(-2)[0];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  get user$(): Observable<User> {
    return this.userService.user$;
  }

  get user(): User {
    return this.userService.user;
  }

  get userPokemons(): PokemonBasic[] {
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
    this.pokeApiService.fetchPokemonDetails('charmeleon');
  }
}
