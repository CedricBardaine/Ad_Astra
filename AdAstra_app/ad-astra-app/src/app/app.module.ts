import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

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
import { PageFeedComponent } from './page-feed/page-feed.component';
import { PublicationComponent } from './publication/publication.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { HeaderLoggedInOrOutComponent } from './style-components/header-logged-in-or-out/header-logged-in-or-out.component';


const appRoutes: Routes = [
  { path: 'register', component: FormRegisterComponent },
  { path: '404', component: Page404Component },
  { path: 'artist', component: PageArtistComponent },
  { path: 'artist/:id', component: PageArtistComponent },
  { path: 'contact', component: PageContactComponent },
  { path: 'feed', component: PageFeedComponent , canActivate: [AuthGuard] },
  { path: 'connect', component: PageLoginComponent },
  
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
    PageFeedComponent,
    PublicationComponent,
    PageLoginComponent,
    HeaderLoggedInOrOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // FIXME: FM7 debugging purposes only
      ),
    ],
    providers: [
      AuthService, 
      AuthGuard, 
      {
        provide: HTTP_INTERCEPTORS, 
        useClass: TokenInterceptorService,
        multi: true
      }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
