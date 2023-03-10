import { Component, OnInit } from '@angular/core';
import { PokeapiService } from './services/pokeapi.service';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-pokemontrainer';

  constructor(private readonly pokeApiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeApiService.fetchPokemons(0, 905);
  }
}
