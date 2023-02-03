import { Component, Input } from '@angular/core';
import { PokemonBasic } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-grid-item',
  templateUrl: './pokemon-grid-item.component.html',
  styleUrls: ['./pokemon-grid-item.component.css'],
})
export class PokemonGridItemComponent {
  @Input() pokemon?: PokemonBasic;

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  zeroPad(num: number): string {
    return num.toString().padStart(4, '0');
  }
}
