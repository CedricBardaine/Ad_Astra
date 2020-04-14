import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRegisterComponent } from './form-register/form-register.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

import { RouterModule , Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';

const appRoutes: Routes = [
  { path: 'register', component: FormRegisterComponent },
  { path: '404', component: Page404Component },
  { path: '', component: FormRegisterComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // FIXME: FM7 debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
