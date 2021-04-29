import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { KatlamaGridComponent } from './katlama-grid.component';
  


@NgModule({
  declarations: [
    KatlamaGridComponent
  ],
  imports: [CommonModule, RouterModule, NgxMasonryModule],
  exports: [KatlamaGridComponent ], 
})
export class KatlamaGridModule { }
