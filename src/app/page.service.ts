import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private page$ = new ReplaySubject<string>(1);
  private normalizedUrl$: Observable<string>;

  constructor(private router: Router) {}

  eagerInit() {
    this.normalizedUrl$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects.substring(1))
    );

    this.normalizedUrl$
      .pipe(tap(console.log.bind(null, 'page:')))
      .subscribe(this.page$);
  }

  page() {
    return this.page$.asObservable();
  }
}
