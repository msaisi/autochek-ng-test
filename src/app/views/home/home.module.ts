import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './app/home.component';
import { MakesService } from 'src/app/services/makes.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehiclesService } from 'src/app/services/vehicles.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    MakesService, VehiclesService
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
