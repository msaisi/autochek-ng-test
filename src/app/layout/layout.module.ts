import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerLayoutComponent } from './dealer-layout/dealer-layout.component';
import { HeaderComponent } from './dealer-layout/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './dealer-layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MakesService } from '../services/makes.service';

const components = [
  HeaderComponent,
  FooterComponent,
  DealerLayoutComponent,
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,

  ],
  declarations: components,
  providers: [MakesService],
  exports: components
})
export class LayoutModule { }
