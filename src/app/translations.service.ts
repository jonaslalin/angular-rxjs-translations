import { Injectable } from '@angular/core';
import { combineLatest, merge, Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  scan,
  shareReplay,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { LanguageService } from './language.service';
import { PageService } from './page.service';
import { TranslationsCache } from './translations-cache.model';
import { TranslationsRemoteService } from './translations-remote.service';
import { Translations } from './translations.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  private translations$ = new ReplaySubject<Translations>(1);
  private translationsCache$: Observable<TranslationsCache>; // replayed
  private partialTranslationsCache$: Observable<TranslationsCache>;
  private translationsId$: Observable<string>;
  private translationsIds$: Observable<string[]>;
  private unseenTranslationsId$: Observable<string>;

  constructor(
    translationsRemoteService: TranslationsRemoteService,
    languageService: LanguageService,
    pageService: PageService
  ) {
    this.translationsId$ = merge(
      languageService.pageChangeLanguage(),
      languageService.userChangeLanguage()
    ).pipe(
      withLatestFrom(pageService.page()),
      map(([language, page]) => `${page}#${language}`)
    );

    this.translationsIds$ = this.translationsId$.pipe(
      scan(
        (ids: string[], id: string) =>
          ids.indexOf(id) < 0 ? [id, ...ids] : ids,
        []
      )
    );

    this.unseenTranslationsId$ = this.translationsIds$.pipe(
      map(translationsIds => translationsIds[0]), // new ids are placed first
      distinctUntilChanged()
    );

    this.partialTranslationsCache$ = this.unseenTranslationsId$.pipe(
      tap(console.log.bind(null, 'fetching translations for')),
      mergeMap(translationsId =>
        translationsRemoteService
          .fetchTranslations(translationsId)
          .pipe(map(translations => ({ [translationsId]: translations })))
      )
    );

    this.translationsCache$ = this.partialTranslationsCache$.pipe(
      scan(
        (
          translationsCache: TranslationsCache,
          partialTranslationsCache: TranslationsCache
        ) => ({ ...translationsCache, ...partialTranslationsCache }),
        {}
      ),
      shareReplay(1)
    );

    combineLatest(this.translationsId$, this.translationsCache$)
      .pipe(
        filter(
          ([translationsId, translationsCache]) =>
            !!translationsCache[translationsId] // cache miss
        ),
        distinctUntilChanged(
          (prev, curr) => prev === curr,
          ([translationsId]) => translationsId
        ),
        map(
          ([translationsId, translationsCache]) =>
            translationsCache[translationsId]
        ),
        tap(translations =>
          console.log('translations:', JSON.stringify(translations, null, 2))
        )
      )
      .subscribe(this.translations$);
  }

  translations() {
    return this.translations$.asObservable();
  }
}
