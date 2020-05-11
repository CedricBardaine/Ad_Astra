import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FormsModule } from "@angular/forms"; // <-- NgModel lives here
import { HttpClientModule } from "@angular/common/http";

// routing
import { RouterModule, Routes } from "@angular/router";

// pages
import { FormRegisterComponent } from "./form-register/form-register.component";
import { Page404Component } from "./page404/page404.component";
import { PageArtistComponent } from "./page-artist/page-artist.component";
import { PageContactComponent } from "./page-contact/page-contact.component";
import { HomeComponent } from "./pages/home/home.component";
import { UiKitComponent } from "./pages/uikit/ui-kit.component";

// styles compoents from F
import { ButtonComponent } from "./style-components/button/button.component";
import { HeaderComponent } from "./style-components/header-home/header-home.component";
import { ButtonRegisterComponent } from "./style-components/button-register/button-register.component";
import { HeaderLoggedInComponent } from "./style-components/header-logged-in/header-logged-in.component";
import { BlocPhotosComponent } from "./style-components/bloc-photos/bloc-photos.component";
import { ButtonUploadComponent } from "./style-components/button-upload/button-upload.component";
import { NotificationItemComponent } from "./style-components/notification-item/notification-item.component";
import { PriceCardComponent } from "./style-components/price-card/price-card.component";
import { BlocSimilarArtistsComponent } from "./style-components/bloc-similar-artists/bloc-similar-artists.component";
import { MusicPlayerComponent } from "./style-components/music-player/music-player.component";
import { ButtonNoLinkComponent } from './style-components/button-no-link/button-no-link.component';

const appRoutes: Routes = [
  { path: "register", component: FormRegisterComponent },
  { path: "404", component: Page404Component },
  { path: "artist", component: PageArtistComponent },
  { path: "artist/:id", component: PageArtistComponent },
  { path: "contact", component: PageContactComponent },
  { path: "home", component: HomeComponent },
  { path: "uikit", component: UiKitComponent },
  { path: "", component: FormRegisterComponent },
  { path: "**", component: Page404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    Page404Component,
    PageArtistComponent,
    HomeComponent,
    UiKitComponent,
    BlocPhotosComponent,
    ButtonUploadComponent,
    NotificationItemComponent,
    ButtonComponent,
    HeaderComponent,
    ButtonRegisterComponent,
    HeaderLoggedInComponent,
    PageContactComponent,
    PriceCardComponent,
    BlocSimilarArtistsComponent,
    MusicPlayerComponent,
    ButtonNoLinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      // {enableTracing: true} // FIXME: FM7 debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
