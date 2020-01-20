import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {Course} from '../course';
import {Filter} from '../filter';
import {UserService} from '../user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any[];
  filter: Filter;
  filtered = false;
  constructor(private courseService: CourseService) {
    this.getCourses();
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  getCourse(course1: Course): Course {
    for (const course of this.courses) {
      if (course === course1) {
        return course;
      }
    }
  }

  filterCourses(filter: Filter) {
    this.filter = filter;
    this.filtered = true;
  }

}
