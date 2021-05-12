import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WatchpageComponent } from './components/watchpage/watchpage.component';
import { TypeaheadBasicComponent } from './components/typeahead-basic/typeahead-basic.component';
import { CarouselPauseComponent } from './components/carousel-pause/carousel-pause.component';
import { CarouselDeckPauseComponent } from './components/carousel-deck-pause/carousel-deck-pause.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WatchlistComponent,
    NavBarComponent,
    WatchpageComponent,
    TypeaheadBasicComponent,
    CarouselPauseComponent,
    CarouselDeckPauseComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    YouTubePlayerModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
