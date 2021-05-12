import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, catchError} from 'rxjs/operators';
import { TmdbService } from '../../services/tmdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typeahead-basic',
  templateUrl: './typeahead-basic.component.html',
  styleUrls: ['./typeahead-basic.component.css']
})
export class TypeaheadBasicComponent implements OnInit {
  public model: any;
  
  constructor(private tmdbService: TmdbService, private router: Router) { }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) =>  this.tmdbService.getSearch(searchText) )          
    );                 
  }

  resultFormatBandListValue(value: any) {            
    return value.name;
  } 
  
  inputFormatBandListValue(value: any)   {
    if(value.name)
      return value.name;
    return value;
  }

  itemSelected($event:any) {
    location.replace('/watch/' + $event.item.media_type + '/' + $event.item.id);
    //this.router.navigate(['watch/' + $event.item.media_type + '/' + $event.item.id]);
  }
}
