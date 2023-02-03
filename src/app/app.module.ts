import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { AddCollectionButtonComponent } from './components/add-collection-button/add-collection-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonGridItemComponent } from './components/pokemon-grid-item/pokemon-grid-item.component';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerPage,
    LoginPage,
    CataloguePage,
    LoginFormComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    AddCollectionButtonComponent,
    PokemonGridItemComponent,
    PokemonGridComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
