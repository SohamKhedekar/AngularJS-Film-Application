import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faFacebookSquare, faImdb, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-watchpage',
  templateUrl: './watchpage.component.html',
  styleUrls: ['./watchpage.component.css']
})
export class WatchpageComponent implements OnInit {
  closeResult = '';
  public videoData: any;
  public details: any;
  public cast: any;
  public isCast:boolean = true;
  public castDetails: any;
  public castExternals: any;
  public reviews: any;
  public isReview:boolean = true;
  public isRecommended:boolean = true;
  public isSimilar:boolean = true;
  public id = this.route.snapshot.paramMap.get('id');
  public mediaType = this.route.snapshot.paramMap.get('mediaType');
  faImdb = faImdb;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebookSquare = faFacebookSquare;
  public local: any;
  public watchlist: any;
  public isMobile:boolean = false;

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  public alertButtonState:string = "";
  public type:string = "";

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private modalService: NgbModal, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => {this.successMessage = message});
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
    this.local = {};
    this.watchlist = {};
    this.alertButtonState = "Add to Watchlist";
    this.type = "success";
    this.fetchData();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.getTweet();
  }

  public changeSuccessMessage() { 
    if (this.alertButtonState == "Add to Watchlist") {
      this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id] = {};
      this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id]["id"] = this.details.id;
      this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id]["title"] = this.details.title;
      this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id]["poster_path"] = this.details.poster_path;
      this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id]["type"] = this.route.snapshot.paramMap.get('mediaType');
      window.localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
      var msg:string = "Added to watchlist."
      this.alertButtonState = "Remove from Watchlist";
      this.type = "success";
      this._success.next(msg); 
    }
    else {
      delete this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id];
      window.localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
      var msg:string = "Removed from watchlist."
      this.alertButtonState = "Add to Watchlist";
      this.type = "danger";
      this._success.next(msg); 
    }
  }

  fetchData() {
    if (this.route.snapshot.paramMap.get('mediaType') == "movie") {
      this.tmdbService.getMovieVideo(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.videoData = res;
      });
      this.tmdbService.getMovieDetails(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.details = res;
        if (localStorage.getItem('viewed') !== null) {
          this.local = JSON.parse(String(window.localStorage.getItem("viewed")));
        }
        if (this.local["movie" + "-" + this.details.id] !== null) {
          delete this.local["movie" + "-" + this.details.id];
        }
        this.local["movie" + "-" + this.details.id] = {};
        this.local["movie" + "-" + this.details.id]["id"] = this.details.id;
        this.local["movie" + "-" + this.details.id]["title"] = this.details.title;
        this.local["movie" + "-" + this.details.id]["poster_path"] = this.details.poster_path;
        this.local["movie" + "-" + this.details.id]["type"] = "movie";
        window.localStorage.setItem("viewed", JSON.stringify(this.local));
        if (window.localStorage.getItem('watchlist') !== null) {
          this.watchlist = JSON.parse(String(window.localStorage.getItem("watchlist")));
          if (this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id] !== null &&
          this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id] !== undefined) {
            this.alertButtonState = "Remove from Watchlist";
          }
        }
      });
      this.tmdbService.getMovieCast(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.cast = res;
        if(this.cast.results.length == 0) {
          this.isCast = false;
        }
      });
      this.tmdbService.getMovieReviews(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.reviews = res;
        if (this.reviews.results.length == 0) {
          this.isReview = false;
        }
      });
      this.tmdbService.getRecommendedMovies(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        let temp:any = res;
        if (temp.length == 0) {
          this.isRecommended = false;
        }
      });
      this.tmdbService.getSimilarMovies(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        let temp:any = res;
        if (temp.length == 0) {
          this.isSimilar = false;
        }
      });
    }
    else {
      this.tmdbService.getTVVideo(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.videoData = res;
      });
      this.tmdbService.getTVDetails(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.details = res;
        if (localStorage.getItem('viewed') !== null) {
          this.local = JSON.parse(String(window.localStorage.getItem("viewed")));
        }
        if (this.local["tv" + "-" + this.details.id] !== null) {
          delete this.local["tv" + "-" + this.details.id];
        }
        this.local["tv" + "-" + this.details.id] = {};
        this.local["tv" + "-" + this.details.id]["id"] = this.details.id;
        this.local["tv" + "-" + this.details.id]["title"] = this.details.title;
        this.local["tv" + "-" + this.details.id]["poster_path"] = this.details.poster_path;
        this.local["tv" + "-" + this.details.id]["type"] = "tv";
        window.localStorage.setItem("viewed", JSON.stringify(this.local));
        if (window.localStorage.getItem('watchlist') !== null) {
          this.watchlist = JSON.parse(String(window.localStorage.getItem("watchlist")));
          if (this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id] !== null &&
          this.watchlist[this.route.snapshot.paramMap.get('mediaType') + "-" + this.details.id] !== undefined) {
            this.alertButtonState = "Remove from Watchlist";
          }
        }
      });
      this.tmdbService.getTVCast(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.cast = res;
        if(this.cast.results.length == 0) {
          this.isCast = false;
        }
      });
      this.tmdbService.getTVReviews(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.reviews = res;
        if (this.reviews.results.length == 0) {
          this.isReview = false;
        }
      });
      this.tmdbService.getRecommendedTVShows(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        let temp:any = res;
        if (temp.length == 0) {
          this.isRecommended = false;
        }
      });
      this.tmdbService.getSimilarTVShows(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        let temp:any = res;
        if (temp.length == 0) {
          this.isSimilar = false;
        }
      });
    }
  }

  getTweet() {
    let tweet:string = "";
    if (this.details.hasOwnProperty("title") && this.details["title"] != null && this.details["title"] != "") {
      tweet += "Watch";
      for (var i = 0; i < this.details["title"].split(" ").length; i++) {
        let temp:string = this.details["title"].split(" ")[i];
        if (temp == "&") {
          tweet += "+%26";
        }
        else if (temp == "!") {
          tweet += "+%21";
        }
        else {
          tweet += "+"+temp;
        }
      }
    }
    return "https://twitter.com/intent/tweet?text=" + tweet + "&url=www.youtube.com/watch?v=" + this.videoData.key + "&hashtags=USC,CSCI571,FightOn";
  }

  getFB() {
    return "https://www.facebook.com/sharer/sharer.php?u=www.youtube.com/watch?v=" + this.videoData.key;
  }

  open(content:any, cast_id:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'modal-deep', scrollable: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.tmdbService.getCastDetails(cast_id).subscribe(res => {
      this.castDetails = res;
    });
    this.tmdbService.getCastExternals(cast_id).subscribe(res => {
      this.castExternals = res;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
