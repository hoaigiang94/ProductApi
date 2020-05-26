import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: "about",
    loadChildren:  () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: "",
    redirectTo: "/products",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
