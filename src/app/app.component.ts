import { MovieService } from './services/movie.service';
import { Movies } from './models/movies';
import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sticky = false;
  subs: Subscription[] = [];
  trending: Movies;
  popular: Movies;
  toprated: Movies;
  original: Movies;
  nowPlaying: Movies;

  sliderConfig = {
    sliderToShow: 9,
    sliderToScroll: 1,
    arrows: true,
    aoutoplay: false,
  };

  @ViewChild('stickHeader') header: Element;

  constructor(private movie: MovieService) {
  }
ngOnInit(): void {
  this.subs.push(this.movie.getTrending().subscribe(data => this.trending = data));
  this.subs.push(this.movie.getTopRated().subscribe(data => this.toprated = data));
  this.subs.push(this.movie.getOriginals().subscribe(data => this.original = data));
  this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
}
ngOnDestroy(): void {
  // Called once, before the instance is destroyed.
  // Add 'implements OnDestroy' to the class.
  this.subs.map(s => s.unsubscribe());
}
}
