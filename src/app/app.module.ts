import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesService } from './services/vehicles.service';
import { MakesService } from './services/makes.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from './layout/layout.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgxPaginationModule
  ],
  providers: [VehiclesService, MakesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
