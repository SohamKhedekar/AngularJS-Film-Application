import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TmdbService } from '../../services/tmdb.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-carousel-deck-pause',
  templateUrl: './carousel-deck-pause.component.html',
  styleUrls: ['./carousel-deck-pause.component.css']
})
export class CarouselDeckPauseComponent implements OnInit {
  @Input() deckType:any;
  @Input() mediaType:any;
  @Input() id:any;
  public imageData: any;
  public myStorage:any;
  public heading:any;
  public range = [0, 5, 10, 15, 20];
  public isMobile:boolean = false;
  constructor(private tmdbService: TmdbService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    //this.carousel.pause();
    this.fetchData();
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
  }

  fetchData() {
    if (this.deckType == "continueWatching") {
      this.heading = "Continue Watching";
      this.myStorage= JSON.parse(String(window.localStorage.getItem("viewed")));
      let keys = Object.keys(this.myStorage).reverse();
      var data_set:any = [];
      var final_data:any = [];
      for(var i=0;i<Math.min(keys.length, 24);i++){
				data_set.push(this.myStorage[keys[i]]);
        if (data_set.length == 6) {
          final_data.push(data_set);
          data_set = [];
        }
      }
      if (data_set.length < 6 && data_set.length > 0) {
				while(data_set.length != 6) {
					data_set.push({});
				}
			}
      if (data_set.length != 0) {
        final_data.push(data_set);
      }
      this.imageData = final_data;
    }
    else if (this.deckType == "popularMovies") {
      this.heading = "Popular Movies";
      this.tmdbService.getPopularMovies().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "topRatedMovies") {
      this.heading = "Top Rated Movies";
      this.tmdbService.getTopRatedMovies().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "trendingMovies") {
      this.heading = "Trending Movies";
      this.tmdbService.getTrendingMovies().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "popularTVShows") {
      this.heading = "Popular TV Shows";
      this.tmdbService.getPopularTVShows().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "topRatedTVShows") {
      this.heading = "Top Rated TV Shows";
      this.tmdbService.getTopRatedTVShows().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "trendingTVShows") {
      this.heading = "Trending TV Shows";
      this.tmdbService.getTrendingTVShows().subscribe(res => {
        this.imageData = res;
      });
    }
    else if (this.deckType == "recommended") {
      if (this.mediaType == "movie") {
        this.heading = "Recommended Movies";
        this.tmdbService.getRecommendedMovies(this.id).subscribe(res => {
          this.imageData = res;
        });
      }
      else {
        this.heading = "Recommended TV Shows";
        this.tmdbService.getRecommendedTVShows(this.id).subscribe(res => {
          this.imageData = res;
        });
      }
    }
    else if (this.deckType == "similar") {
      if (this.mediaType == "movie") {
        this.heading = "Similar Movies";
        this.tmdbService.getSimilarMovies(this.id).subscribe(res => {
          this.imageData = res;
        });
      }
      else {
        this.heading = "Similar TV Shows";
        this.tmdbService.getSimilarTVShows(this.id).subscribe(res => {
          this.imageData = res;
        });
      }
    }
  }

  paused = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  itemSelected(img:any, mType: any) {
    if (mType == '' || mType == null) {
      return '/watch/' + this.mediaType + '/' + img.id;
    }
    else {
      return '/watch/' + mType + '/' + img.id;
    }
  }

}
