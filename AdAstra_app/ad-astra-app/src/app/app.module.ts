import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRegisterComponent } from './form-register/form-register.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

// routing
import { RouterModule , Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { PageArtistComponent } from './page-artist/page-artist.component';

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
