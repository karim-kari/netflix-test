import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../modul/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

    @Input() sliderConfig: any;
    @Input() movies: Movies;
    @Input() titel: string;

  constructor() { }

  ngOnInit(): void {
  }

}
