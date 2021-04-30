import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileKatlamaComponent } from './profile-katlama/profile-katlama.component';
import { ProfileKatlamaStatusComponent } from './profile-katlama-status/profile-katlama-status.component';
import { ProfileResolverService } from './profile-resolver.service';
import { KatlamaResolverService } from './profile-katlama/katlama-resolver.service';

const routes: Routes = [
  {
    path: ':profileId',
    component: ProfileDetailComponent,
    resolve: {
      profile: ProfileResolverService,
    },
  },
  {
    path: ':profileId/p/:katlamaId',
    component: ProfileKatlamaComponent,
    resolve: {
      profile: ProfileResolverService,
      katlama: KatlamaResolverService,
    },
  },
  {
    path: ':profileId/p/:katlamaId/status',
    component: ProfileKatlamaStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
