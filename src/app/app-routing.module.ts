import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAComponent } from './page-a.component';
import { PageBComponent } from './page-b.component';
import { PageCComponent } from './page-c.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page-a',
    pathMatch: 'full'
  },
  {
    path: 'page-a',
    component: PageAComponent
  },
  {
    path: 'page-b',
    component: PageBComponent
  },
  {
    path: 'page-c',
    component: PageCComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
