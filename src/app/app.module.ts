import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrainerPage } from './pages/trainer-page/trainer.page';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue-page/catalogue.page';

@NgModule({
  declarations: [AppComponent, TrainerPage, LoginPage, CataloguePage],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
