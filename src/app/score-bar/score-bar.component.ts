import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.css']
})
export class ScoreBarComponent implements OnInit {
  rating = new Array(5);
  @Input() stars: number;
  @Input() blocked: boolean;
  @Output() ratingEvent = new EventEmitter();
  userRating = 0;
  constructor() {

  }

  ngOnInit() {
    this.resetRating(0);
  }

  resetRating(j: number): void {
    console.log('resetRating ' + j);
    this.userRating = 0;
    let temp = this.stars;
    for (let i = 0; i < 5; i++) {
      if (temp >= 1) {
        this.rating[i] = 1;
      } else {
        this.rating[i] = 0;
      }
      temp--;
    }
  }

  resetHoverRating(j: number): void {
    console.log('resetHoverRating ' + j);
    let temp = this.stars;
    let temp2 = this.userRating;
    for (let i = 0; i < 5; i++) {
      if (temp2 >= 1) {
        this.rating[i] = 2;
      } else if (temp >= 1) {
        this.rating[i] = 1;
 } else {
        this.rating[i] = 0;
 }
      temp--;
      temp2--;
    }
  }

  setRating(userRating: number): void {
    console.log(this.stars);
    if (!this.stars || this.stars === 0) {
      this.ratingEvent.emit(userRating);
      if (this.userRating === userRating) {
        this.resetRating(userRating);
      } else {
        this.userRating = userRating;
        this.resetHoverRating(userRating);
      }
    }
  }
}
