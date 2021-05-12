import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public navbarTitle : string = "USC Films";
  public isMenuCollapsed = true;
  public isMobile:boolean = false;
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      this.isMobile = true;
    }
  }

}
