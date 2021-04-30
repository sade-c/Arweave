import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../shared/models/profile';
import { Katlama } from '../../shared/models/katlama';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-katlama',
  templateUrl: './profile-katlama.component.html',
  styleUrls: ['./profile-katlama.component.scss'],
})
export class ProfileKatlamaComponent implements OnInit {
  public profile: Profile;
  public katlama: Katlama;
  public imageUrl: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.profile = data.profile;
      this.katlama = data.katlama;
      this.imageUrl = `${environment.arweaveDomain}/${this.katlama.imageId}`;
    });
  }
}
