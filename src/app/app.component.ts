import { Component } from '@angular/core';
import { PokeapiService } from './services/api/pokeapi.service';
import { UserService } from './services/api/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-pokemontrainer';

  constructor(
    private readonly userService: UserService,
    private readonly pokeApiService: PokeapiService
  ) {}

  ngOnInit(): void {
    this.userService.fetchUser();
    this.pokeApiService.fetchPokemons(0, 30);
  }
}
