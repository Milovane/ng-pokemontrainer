import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LoginPage } from "./pages/login/login.page";
import { TrainerComponent } from "./pages/trainer/trainer.component";

const routes: Routes = [
    {
        path: "",
        component: LoginPage
    },
    {
        path: "trainer",
        component: TrainerComponent
    },
    {
        path: "catalogue",
        component: CataloguePage
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}