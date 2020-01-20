import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/** !!!!
 * for tests (test) of set env 
 * BUT ARE DEPRECATED !
*/
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
