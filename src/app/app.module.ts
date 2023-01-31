import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrainerPageComponent } from './pages/trainer-page/trainer-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';

@NgModule({
  declarations: [AppComponent, TrainerPageComponent, CataloguePageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
