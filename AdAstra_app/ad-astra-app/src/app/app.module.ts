import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

// routing
import { RouterModule , Routes } from '@angular/router';

// pages
import { FormRegisterComponent } from './form-register/form-register.component';
import { Page404Component } from './page404/page404.component';
import { PageArtistComponent } from './page-artist/page-artist.component';
import { PageContactComponent } from './page-contact/page-contact.component';

// styles compoents from F
import { ButtonComponent } from './style-components/button/button.component';
import { HeaderComponent } from './style-components/header-home/header-home.component';
import { ButtonRegisterComponent } from './style-components/button-register/button-register.component';
import { HeaderLoggedInComponent } from './style-components/header-logged-in/header-logged-in.component';


const appRoutes: Routes = [
  { path: 'register', component: FormRegisterComponent },
  { path: '404', component: Page404Component },
  { path: 'artist', component: PageArtistComponent },
  { path: 'artist/:id', component: PageArtistComponent },
  { path: 'contact', component: PageContactComponent },
  
  { path: '', component: FormRegisterComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    Page404Component,
    PageArtistComponent,
    
    ButtonComponent,
    HeaderComponent,
    ButtonRegisterComponent,
    HeaderLoggedInComponent,
    PageContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // FIXME: FM7 debugging purposes only
      ),
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
