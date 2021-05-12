import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WatchpageComponent } from './components/watchpage/watchpage.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {
    path: 'watch',
    children: [
      {
        path: ':mediaType',
        children: [{path: ':id', component: WatchpageComponent}]
      }
    ]
  },
  {path: 'mylist', component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
