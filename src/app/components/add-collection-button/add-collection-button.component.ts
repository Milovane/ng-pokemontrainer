import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserPatchService } from 'src/app/services/user-patch.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-collection-button',
  templateUrl: './add-collection-button.component.html',
  styleUrls: ['./add-collection-button.component.css'],
})
//Button for adding a pokemon to user inventory or removing it from inventory
export class AddCollectionButtonComponent {
  public loading: boolean = false; //true when the api communication is in progress
  public inOwnedPokemons: boolean = false; //true when this pokemon is in the user's inventory
  @Input() pokemonName: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly userPatchService: UserPatchService
  ) {}

  ngOnInit(): void {
    this.inOwnedPokemons = this.userService.inOwnedPokemons(this.pokemonName);
  }

  //Add the target pokemon to the user's inventory or remove it from the inventory
  onAddClick(): void {
    this.loading = true;
    this.userPatchService.addToCollection(this.pokemonName).subscribe({
      next: (user: User) => {
        this.loading = false;
        this.inOwnedPokemons = this.userService.inOwnedPokemons(
          this.pokemonName
        );
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERROR', error.message);
      },
    });
  }
}
