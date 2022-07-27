import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerLayoutComponent } from './layout/dealer-layout/dealer-layout.component';

//lazyload modules
const routes: Routes = [

  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DealerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: DealerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/catalogue/catalogue.module').then(m => m.CatalogueModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
