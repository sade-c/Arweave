import { Component, OnInit } from '@angular/core';
import { Observable, timer, combineLatest } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { KatlamaService } from '../../shared/services/katlama.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-katlama-status',
  templateUrl: './profile-katlama-status.component.html',
  styleUrls: ['./profile-katlama-status.component.scss'],
})
export class ProfileKatlamaStatusComponent implements OnInit {
  public profileId: string;
  public katlamaId: string;
  public katlamaPublished$: Observable<boolean>;

  constructor(private katlamaService: KatlamaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.katlamaPublished$ = combineLatest(
      this.route.params.pipe(
        tap((params) => (this.profileId = params['profileId'])),
        map((params) => {
          this.katlamaId = params['katlamaId'];
          return this.katlamaId;
        }),
      ),
      timer(0, 30 * 1000),
    ).pipe(flatMap(([katlamaId]) => this.katlamaService.getKatlamaPublishStatus(katlamaId)));
  }
}
