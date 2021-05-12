import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TmdbService } from '../../services/tmdb.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-carousel-pause',
  templateUrl: './carousel-pause.component.html',
  styleUrls: ['./carousel-pause.component.css']
})
export class CarouselPauseComponent implements OnInit {
  public currentlyPlayingMovies: any;
  public isMobile:boolean = false;
  public images = [];
  constructor(private tmdbService: TmdbService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.fetchData();
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
  }

  fetchData() {
    this.tmdbService.getCurrentlyPlayingMovies().subscribe(res => {
      this.currentlyPlayingMovies = res;
    });
  }

  paused = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (!slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  itemSelected(img:any) {
    return '/watch/movie/' + img.id;
  }
}
