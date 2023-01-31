import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePage } from './pages/catalogue-page/catalogue.page';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer-page/trainer.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'trainer',
    component: TrainerPage,
  },
  {
    path: 'catalogue',
    component: CataloguePage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
