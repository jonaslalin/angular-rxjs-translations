import { Injectable } from '@angular/core';
import { merge, NEVER, Observable, ReplaySubject, Subject } from 'rxjs';
import {
  first,
  map,
  merge as operatorMerge,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { LanguageRemoteService } from './language-remote.service';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private availableLanguages$: Observable<string[]>;
  private language$ = new ReplaySubject<string>(1);
  private firstLanguage$: Observable<string>;
  private pageChangeLanguage$: Observable<string>;
  private userChangeLanguage$ = new Subject<string>();

  constructor(
    languageRemoteService: LanguageRemoteService,
    pageService: PageService
  ) {
    this.availableLanguages$ = pageService
      .page()
      .pipe(
        switchMap(page => languageRemoteService.fetchAvailableLanguages(page))
      );

    this.firstLanguage$ = this.availableLanguages$.pipe(
      map(availableLanguages => availableLanguages[0]),
      first(),
      operatorMerge(NEVER) // very important
    );

    this.pageChangeLanguage$ = this.availableLanguages$.pipe(
      withLatestFrom(this.language$),
      map(([availableLanguages, language]) =>
        availableLanguages.indexOf(language) < 0
          ? availableLanguages[0]
          : language
      )
    );

    merge(
      this.firstLanguage$.pipe(
        tap(console.log.bind(null, 'language (first):'))
      ),
      this.pageChangeLanguage$.pipe(
        tap(console.log.bind(null, 'language (page change):'))
      ),
      this.userChangeLanguage$.pipe(
        tap(console.log.bind(null, 'language (user change):'))
      )
    ).subscribe(this.language$);
  }

  availableLanguages() {
    return this.availableLanguages$;
  }

  language() {
    return this.language$.asObservable();
  }

  firstLanguage() {
    return this.firstLanguage$;
  }

  pageChangeLanguage() {
    return this.pageChangeLanguage$;
  }

  userChangeLanguage() {
    return this.userChangeLanguage$.asObservable();
  }

  doUserChangeLanguage(language: string) {
    this.userChangeLanguage$.next(language);
  }
}
