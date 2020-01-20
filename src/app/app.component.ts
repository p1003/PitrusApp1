import { Component } from '@angular/core';
import {CourseBarComponent} from './course-bar/course-bar.component';
import {CoursesComponent} from './courses/courses.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PitrusApp';
}
