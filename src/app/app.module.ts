import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrainerPage } from './pages/trainer-page/trainer.page';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue-page/catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TrainerPage, LoginPage, CataloguePage, LoginFormComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
