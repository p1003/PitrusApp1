import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Course} from '../course';

@Component({
  selector: 'app-course-creator',
  templateUrl: './course-creator.component.html',
  styleUrls: ['./course-creator.component.css']
})
export class CourseCreatorComponent implements OnInit {
  course: Course;
  constructor() {}

  @Output()
  eventSubmit = new EventEmitter<Course>();
  @Output()
  eventClose = new EventEmitter();

  ngOnInit() {
    this.course = new Course();
  }
  submitCourse(): void {
    this.eventSubmit.emit(this.course);
  }
  hide(): void {
    this.eventClose.emit();
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
