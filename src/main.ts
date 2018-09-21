import {enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}
declare const require;
let lang = localStorage.getItem('lang');
console.log(lang);
if (lang === null) {
  lang = 'en';
  localStorage.setItem('lang', lang);
}
const translations = require(`raw-loader!./locale/messages.${lang}.xlf`);
platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
})
  .catch(err => console.log(err));
