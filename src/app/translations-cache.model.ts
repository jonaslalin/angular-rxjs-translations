import { Translations } from './translations.model';

export interface TranslationsCache {
  [translationsId: string]: Translations;
}
