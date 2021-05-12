import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public isContinueWatching:boolean = true;
  public isMobile:boolean = false;

  constructor(private tmdbService: TmdbService, public breakpointObserver: BreakpointObserver) { }
  
  ngOnInit(): void {
    if (window.localStorage.getItem("viewed") === null) {
      this.isContinueWatching = false;
    }
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
  }

}
