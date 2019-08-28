import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Page B</h1>
    <a [routerLink]="'/page-a'">Page A</a>
    &nbsp;
    <a [routerLink]="'/page-c'">Page C</a>
  `
})
export class PageBComponent {}
