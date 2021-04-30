import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KatlamaGridModule } from '../shared/components/katlama-grid/katlama-grid.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, KatlamaGridModule, LandingRoutingModule],
})
export class LandingModule {}
