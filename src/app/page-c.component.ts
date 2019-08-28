import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Page C</h1>
    <a [routerLink]="'/page-a'">Page A</a>
    &nbsp;
    <a [routerLink]="'/page-b'">Page B</a>
  `
})
export class PageCComponent {}
