import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Filter} from '../filter';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  filter: Filter;
  constructor() { }

  @Output()
  eventFilter = new EventEmitter<Filter>();

  ngOnInit() {
    this.filter = new Filter();
  }
  sendFilter(): void {
    this.eventFilter.emit(this.filter);
  }
  clearFilter(): void {
    this.filter = new Filter();
    this.eventFilter.emit(new Filter());
  }
}
