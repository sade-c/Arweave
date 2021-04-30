import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, from, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { Katlama } from '../../shared/models/katlama';
import { KatlamaService } from '../../shared/services/katlama.service';

@Injectable({
  providedIn: 'root',
})
export class KatlamaResolverService {
  constructor(private katlamaService: KatlamaService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Katlama> | Observable<never> {
    let katlamaId = route.paramMap.get('katlamaId');

    return from(this.katlamaService.getKatlama(katlamaId)).pipe(
      take(1),
      mergeMap((katlama) => {
        if (katlama) {
          return of(katlama);
        } else {
          this.router.navigateByUrl('/');
          return EMPTY;
        }
      }),
    );
  }
}
