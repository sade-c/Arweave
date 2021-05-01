import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {  scan, tap, map, mergeMap } from 'rxjs/operators';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Katlama } from '../../models/katlama';
import { WithId } from '../../models/with-id';
import { KatlamaService } from '../../services/katlama.service';
import { environment } from 'src/environments/environment';

const PAGE_SIZE = 9;
@Component({
  selector: 'app-katlama-grid',
  templateUrl: './katlama-grid.component.html',
  styleUrls: ['./katlama-grid.component.scss']
})
export class KatlamaGridComponent implements OnInit {
  @Input() public profileId: string;

  public katlamasQuery$: Observable<{
    loading: boolean;
    atEnd: boolean;
    katlamas: (Katlama & WithId)[];
  }>;
  public loadMoreEvent$ = new BehaviorSubject<any>(null);

  public imagePeerHost = "environment.arweaveDomain";// todo fix

  public options: NgxMasonryOptions = {
    gutter: 18,
  };

  private katlamaIds: string[] = [];
  private katlamas$ = new BehaviorSubject<(Katlama & WithId)[]>([]);
  private katlamasLoading$ = new BehaviorSubject<boolean>(true);
  private lastKatlamaIndex = 0;

  constructor(private katlamaService: KatlamaService) {}

  ngOnInit(): void {
    this.loadMoreEvent$
      .pipe(
        tap(() => this.katlamasLoading$.next(true)),
        mergeMap(() =>
          !this.katlamaIds.length
            ? this.katlamaService.getKatlamaIds(this.profileId)
            : Promise.resolve(this.katlamaIds),
        ),
        tap((katlamaIds) => (this.katlamaIds = katlamaIds)),
        mergeMap(() =>
          Promise.allSettled(
            this.katlamaIds
              .slice(this.lastKatlamaIndex, this.lastKatlamaIndex + PAGE_SIZE)
              .map((quizId) => this.katlamaService.getKatlama(quizId)),
          ),
        ),
        map((results) =>
          results
            .map((r, i) => {
              if (r.status === 'rejected' || !r.value) return null;
              return r.value;
            })
            .filter((q) => q),
        ),
        scan((whole, page) => whole.concat(page)),
        tap(() => {
          this.lastKatlamaIndex = Math.min(
            this.lastKatlamaIndex + PAGE_SIZE,
            this.katlamaIds.length,
          );

          this.katlamasLoading$.next(false);
        }),
      )
      .subscribe(this.katlamas$);

    this.katlamasQuery$ = combineLatest(this.katlamasLoading$, this.katlamas$).pipe(
      map(([loading, katlamas]) => ({
        loading,
        atEnd: this.lastKatlamaIndex === this.katlamaIds.length,
        katlamas,
        /*katlamas.length > 0
            ? (new Array(8).fill(katlamas[0]) as (Katlama & WithId)[])
            : [],*/
      })),
    );
  }
}
