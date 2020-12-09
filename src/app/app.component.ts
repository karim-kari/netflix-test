import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './modul/movies';
import { MovieService } from './serveces/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  title = 'netflix';
  sticky = false;
  subs: Subscription[] = [];
  trending: Movies;
  popular: Movies;
  toprated: Movies;
  originals: Movies;
  nowplaying: Movies;


  sliderConfig = {
    slidertoshow: 6,
    slidertoscroll: 1,
    arrows: true,
    autoplay: true,
  }
  @ViewChild("stickHeader") header: ElementRef;

  constructor(private movie: MovieService) {
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.subs.push(this.movie.getTrending().subscribe(  data => this.trending = data));
    this.subs.push(this.movie.getPopularMovies().subscribe(  data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe( data => this.toprated = data));
    this.subs.push(this.movie.getOriginals().subscribe( data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe( data => this.nowplaying = data));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.map(s => s.unsubscribe());
  }
}
