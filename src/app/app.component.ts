import { Component } from '@angular/core';
import { LanguageService } from './language.service';
import { PageService } from './page.service';
import { TranslationsService } from './translations.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <b>Language:</b> {{ language | async }}
      <br />
      <b>Translations:</b>
      <pre>{{ translations | async | json }}</pre>
      <br />
      <ng-container *ngFor="let aLanguage of availableLanguages | async">
        <button type="button" (click)="doUserChangeLanguage(aLanguage)">
          {{ aLanguage }}
        </button>
        &nbsp;
      </ng-container>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor(
    private pageService: PageService,
    private languageService: LanguageService,
    private translationsService: TranslationsService
  ) {
    this.pageService.eagerInit(); // ugly
  }

  get language() {
    return this.languageService.language();
  }

  get translations() {
    return this.translationsService.translations();
  }

  get availableLanguages() {
    return this.languageService.availableLanguages();
  }

  doUserChangeLanguage(language: string) {
    this.languageService.doUserChangeLanguage(language);
  }
}
