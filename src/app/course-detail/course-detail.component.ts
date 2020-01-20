import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../course.service';
import {UserService} from '../user.service';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: any;
  rating: number;
  isAuthenticated: boolean;
  isEnrolled: boolean;
  canEnroll: boolean;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private userService: UserService) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(course => {
      this.course = course;
      this.updateEnrollmentInfo();
    });
  }

  updateEnrollmentInfo() {
    this.userService.afAuth.authState.subscribe(data => {
      if (data) {
        this.userService.getUserData(data.email).subscribe(user => {
          if (user) {
            this.isAuthenticated = true;
          }
          this.isEnrolled = this.userService.isEnrolled(this.course.id);
          console.log(this.course.studentsEnrolled, this.course.studentsLimit);
          if (this.course.studentsEnrolled < this.course.studentsLimit) {
            if (this.isEnrolled === false) {
              this.canEnroll = true;
            } else {
              this.canEnroll = false;
              this.rating = this.userService.getRating(this.course.id);
            }
          } else {
            this.canEnroll = false;
          }
          console.log(this.canEnroll, this.isEnrolled, this.rating);
        });
      }
    });
  }

  enroll() {
    this.userService.enroll(this.course.id);
    this.isEnrolled = true;
    this.canEnroll = false;
  }

  setRating(rating) {
    if (!this.rating) {
      this.userService.setRating(this.course.id, rating);
      this.rating = rating;
    }
  }

  countRating() {
    return Math.round(this.course.ratingSum * 100 / this.course.ratingCount) / 100;
  }
}
