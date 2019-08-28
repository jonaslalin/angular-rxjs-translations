import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageRemoteService {
  private cache: { [page: string]: Observable<string[]> } = {};

  fetchAvailableLanguages(page: string) {
    return (
      this.cache[page] ||
      (this.cache[page] = this.availableLanguagesWithDelayFactory(page))
    );
  }

  private availableLanguagesWithDelayFactory(
    page: string,
    minDelay = 1000,
    maxDelay = 5000
  ) {
    return this.availableLanguagesFactory(page).pipe(
      delay(Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay),
      shareReplay(1)
    );
  }

  private availableLanguagesFactory(page: string): Observable<string[]> {
    switch (page) {
      case 'page-b':
        return of(['English', 'Swedish']);
      case 'page-c':
        return of(['Spanish']);
      default:
        return of(['English', 'Swedish', 'Russian']);
    }
  }
}
