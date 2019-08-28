import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';
import { Translations } from './translations.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationsRemoteService {
  private cache: { [translationsId: string]: Observable<Translations> } = {};

  fetchTranslations(translationsId: string) {
    return (
      this.cache[translationsId] ||
      (this.cache[translationsId] = this.translationsWithDelayFactory(
        translationsId
      ))
    );
  }

  private translationsWithDelayFactory(
    translationsId: string,
    minDelay = 1000,
    maxDelay = 5000
  ) {
    return this.translationsFactory(translationsId).pipe(
      delay(Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay),
      shareReplay(1)
    );
  }

  private translationsFactory(
    translationsId: string
  ): Observable<Translations> {
    switch (translationsId) {
      case 'page-a#English':
        return of({
          key1: 'page-a-english1',
          key2: 'page-a-english2',
          key3: 'page-a-english3'
        });
      case 'page-a#Swedish':
        return of({
          key7: 'page-a-swedish7',
          key8: 'page-a-swedish8',
          key9: 'page-a-swedish9'
        });
      case 'page-a#Russian':
        return of({
          key1: 'page-a-russian1',
          key2: 'page-a-russian2',
          key3: 'page-a-russian3'
        });
      case 'page-b#English':
        return of({
          key1: 'page-b-english1',
          key2: 'page-b-english2',
          key3: 'page-b-english3'
        });
      case 'page-b#Swedish':
        return of({
          key4: 'page-b-swedish4',
          key5: 'page-b-swedish5',
          key6: 'page-b-swedish6'
        });
      case 'page-c#Spanish':
        return of({
          key1: 'page-c-spanish1',
          key3: 'page-c-spanish3',
          key6: 'page-c-spanish6'
        });
      default:
        return of({
          key10: 'value10',
          key20: 'value20',
          key30: 'value30'
        });
    }
  }
}
