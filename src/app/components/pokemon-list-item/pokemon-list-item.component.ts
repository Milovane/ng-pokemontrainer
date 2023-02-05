import { Component, Input } from '@angular/core';
import { PokemonBasic } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent {
  @Input() pokemon?: PokemonBasic;

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  zeroPad(num: number): string {
    return num.toString().padStart(4, '0');
  }
}
