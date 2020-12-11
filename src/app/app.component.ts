import { MovieService } from './services/movie.service';
import { Movies } from './models/movies';
import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
    sliderToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;
  title: any;

  constructor(private movie: MovieService) {
  }
ngOnInit(): void {
  this.subs.push(this.movie.getTrending().subscribe(data => {
    this.trending = data;
    this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;
  }));
  this.subs.push(this.movie.getTopRated().subscribe(data => this.toprated = data));
  this.subs.push(this.movie.getOriginals().subscribe(data => this.original = data));
  this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
}
ngOnDestroy(): void {
  // Called once, before the instance is destroyed.
  // Add 'implements OnDestroy' to the class.
  this.subs.map(s => s.unsubscribe());
}

@HostListener('window:scroll', ['$event'])

// tslint:disable-next-line:typedef
handleScroll(){
const windowScroll = window.pageYOffset;

if (windowScroll > this.header.nativeElement.offsetHeight) {
  this.sticky = true;
 } else {
  this.sticky = false;
 }
 }
}
