import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailsComponent } from './app/listing-details/listing-details.component';
import { ListingComponent } from './app/listing/listing.component';

const routes: Routes = [
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'listing/:id',
    component: ListingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
