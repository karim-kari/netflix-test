import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';



const enum endpoint {
  latest = '/movie/latest',
  now_playing = '/movie/latest',
  upcoming = '/movie/latest',
  trending = '/movie/latest',
  original = '/movie/latest',
}


@Injectable({
  providedIn: 'root'
})


export class MovieService {
  private URL = 'https://api.themoviedb.org/3';

  private api_key = environment.api;

  constructor(private http: HttpClient) {}

  getLatsetMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`, {
      params: {
        api_key: this.api_key
      }

    });
  }
  getNowPlaying(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`, {
      params: {
        api_key: this.api_key
      }

    });
  }
  getOriginals(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.original}`, {
      params: {
        api_key: this.api_key
      }

    });
  }
  getPopularMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.popular}`, {
      params: {
        api_key: this.api_key
      }

    });
  }
  getTopRated(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.top_rated}`, {
      params: {
        api_key: this.api_key
      }

    });
  }
  getTrending(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.trending}`, {
      params: {
        api_key: this.api_key
      }
    });
  }
}
