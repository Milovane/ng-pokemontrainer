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

  get user$(): Observable<User[]> {
    return this.userService.user$;
  }

  get pokemon$(): Observable<PokemonDetails> {
    return this.pokeApiService.pokemon$;
  }

  ngOnInit(): void {
    this.userService.fetchUser();
    this.pokeApiService.fetchPokemonDetails('charmeleon');
  }
}
