import { Component, OnInit } from '@angular/core';
import {Course} from '../course';
import {Filter} from '../filter';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css']
})
export class CoursesAdminComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;

  courses: Course[];
  filter: Filter;
  filtered = false;
  showNewCourseForm = false;
  constructor(private courseService: CourseService) {
    this.getCourses();
  }

  ngOnInit() {
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

  deleteCourse(id: string): void {
    this.courseService.removeCourse(id).then(() => {
      this.getCourses();
    });
  }

  filterCourses(filter: Filter) {
    this.filter = filter;
    this.filtered = true;
  }

  addCourse(course: Course): void {
    this.showNewCourseForm = false;
    this.courseService.addCourse(course).then(() => {
      this.getCourses();
    });
  }

}
