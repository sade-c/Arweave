import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KatlamaGridModule } from '../shared/components/katlama-grid/katlama-grid.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileKatlamaComponent } from './profile-katlama/profile-katlama.component';
import { ProfileKatlamaStatusComponent } from './profile-katlama-status/profile-katlama-status.component';

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileKatlamaComponent,
    ProfileKatlamaStatusComponent,
  ],
  imports: [CommonModule, KatlamaGridModule, ProfileRoutingModule],
})
export class ProfileModule {}
