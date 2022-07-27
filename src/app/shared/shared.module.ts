import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MakesService } from 'src/app/services/makes.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    MakesService
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SharedModule { }
