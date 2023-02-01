import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CataloguePage } from './pages/catalogue-page/catalogue.page';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer-page/trainer.page';

const routes: Routes = [
  {
  path: "",
  pathMatch: "full",
  redirectTo: "/login"
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate: [ AuthGuard ]

  },
  {
    path: 'catalogue',
    component: CataloguePage,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
