import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { CatalogueRoutingModule } from './catalogue-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ListingDetailsComponent } from './app/listing-details/listing-details.component';
import { ListingComponent } from './app/listing/listing.component';
import { MakesService } from 'src/app/services/makes.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CatalogueRoutingModule,
    SharedModule
  ],
  providers: [
    VehiclesService, MakesService
  ],
  declarations: [ListingDetailsComponent, ListingComponent]
})
export class CatalogueModule { }
