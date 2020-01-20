import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Course } from '../course';
import {UserService} from '../user.service';

@Component({
  selector: 'app-course-bar',
  templateUrl: './course-bar.component.html',
  styleUrls: ['./course-bar.component.css']
})
export class CourseBarComponent implements OnInit {
  isAdmin: boolean;

  @Input() public course: Course;

  @Output() eventDelete = new EventEmitter<string>();

  constructor(private userService: UserService) {
    this.isAdmin = false;
    this.userService.afAuth.authState.subscribe(data => {
      if (data) {
        this.userService.getUserData(data.email).subscribe(user => {
          if (user.role === 'admin') {
            this.isAdmin = true;
          }
        });
      }
    });
  }

  ngOnInit() {}

  deleteCourse(): void {
    this.eventDelete.emit(this.course.id);
  }
}
