import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAComponent } from './page-a.component';
import { PageBComponent } from './page-b.component';
import { PageCComponent } from './page-c.component';

@NgModule({
  declarations: [AppComponent, PageAComponent, PageBComponent, PageCComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
