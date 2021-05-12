import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient: HttpClient) { }

  getCurrentlyPlayingMovies() {
    let URL = "/apis/currentlyPlayingMovies";
    return this.httpClient.get(URL);
  }

  getPopularMovies() {
    let URL = "/apis/popularMovies";
    return this.httpClient.get(URL);
  }

  getTopRatedMovies() {
    let URL = "/apis/topRatedMovies";
    return this.httpClient.get(URL);
  }

  getTrendingMovies() {
    let URL = "/apis/trendingMovies";
    return this.httpClient.get(URL);
  }

  getPopularTVShows() {
    let URL = "/apis/popularTVShows";
    return this.httpClient.get(URL);
  }

  getTopRatedTVShows() {
    let URL = "/apis/topRatedTVShows";
    return this.httpClient.get(URL);
  }

  getTrendingTVShows() {
    let URL = "/apis/trendingTVShows";
    return this.httpClient.get(URL);
  }
  
  getSearch(searchQuery:any) {
    let URL = "/apis/search/?search_query=" + searchQuery;
    return this.httpClient.get<[any, string[]]>(URL);
  }

  getMovieVideo(movieID:any) {
    let URL = "/apis/moviesVideo/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getTVVideo(tvID:any) {
    let URL = "/apis/tvShowVideo/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }

  getMovieDetails(movieID:any) {
    let URL = "/apis/movieDetails/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getTVDetails(tvID:any) {
    let URL = "/apis/tvShowDetails/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }

  getMovieCast(movieID:any) {
    let URL = "/apis/movieCast/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getTVCast(tvID:any) {
    let URL = "/apis/tvShowCast/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }

  getCastDetails(castID:any) {
    let URL = "/apis/castDetails/?person_id=" + castID;
    return this.httpClient.get(URL);
  }

  getCastExternals(castID:any) {
    let URL = "/apis/castExternalIDs/?person_id=" + castID;
    return this.httpClient.get(URL);
  }

  getMovieReviews(movieID:any) {
    let URL = "/apis/movieReviews/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getTVReviews(tvID:any) {
    let URL = "/apis/tvShowReviews/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }

  getRecommendedMovies(movieID:any) {
    let URL = "/apis/recommendedMovies/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getRecommendedTVShows(tvID:any) {
    let URL = "/apis/recommendedTVShows/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }

  getSimilarMovies(movieID:any) {
    let URL = "/apis/similarMovies/?movie_id=" + movieID;
    return this.httpClient.get(URL);
  }

  getSimilarTVShows(tvID:any) {
    let URL = "/apis/similarTVShows/?tv_show_id=" + tvID;
    return this.httpClient.get(URL);
  }
}
