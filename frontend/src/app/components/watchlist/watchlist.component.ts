import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  public watchlist: any;
  public isWatchList:boolean = true;
  public final_data:any = [];
  public isMobile:boolean = false;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
    this.watchlist = {};
    if (JSON.parse(String(window.localStorage.getItem("watchlist"))) !== null && JSON.parse(String(window.localStorage.getItem("watchlist"))) !== undefined && 
    Object.keys(JSON.parse(String(window.localStorage.getItem("watchlist")))).length !== 0) {
      this.watchlist = JSON.parse(String(window.localStorage.getItem("watchlist")));
      let keys = Object.keys(this.watchlist).reverse();
      var data_set:any = [];
      for(var i=0;i<keys.length;i++){
				data_set.push(this.watchlist[keys[i]]);
        if (data_set.length == 6) {
          this.final_data.push(data_set);
          data_set = [];
        }
      }
      if (data_set.length < 6 && data_set.length > 0) {
				while(data_set.length != 6) {
					data_set.push({});
				}
			}
      if (data_set.length != 0) {
        this.final_data.push(data_set);
      }
    }
    else {
      this.isWatchList = false;
    }
  }

  itemSelected(img:any, mType: any) {
    return '/watch/' + mType + '/' + img.id;
  }

}
