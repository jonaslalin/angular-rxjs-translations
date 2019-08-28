import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Page A</h1>
    <a [routerLink]="'/page-b'">Page B</a>
    &nbsp;
    <a [routerLink]="'/page-c'">Page C</a>
  `
})
export class PageAComponent {}
