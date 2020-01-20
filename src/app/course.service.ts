import { Injectable } from '@angular/core';
import {Course} from './course';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses: any[];

  constructor(private dataBase: AngularFirestore) {
    this.courses = new Array<Course>();
    this.getCourses();
  }

  getCourses() {
    return this.dataBase.collection('/Courses').get().pipe(map(list => {
      this.courses = [];
      list.docs.forEach(item => {
        const course = item.data();
        course.id = item.id;
        this.courses.push(course);
      });
      return this.courses;
    }));
  }

  getCourse(id: string) {
    return this.dataBase.doc(`/Courses/${id}`).get().pipe(map((item) => {
      const course = item.data();
      course.id = item.id;
      return course;
    }));
  }

  addCourse(course: Course) {
    const courseToAdd = course;
    courseToAdd.studentsEnrolled = 0;
    courseToAdd.ratingCount = 0;
    courseToAdd.ratingSum = 0;
    console.log(course, courseToAdd);

    return this.dataBase.collection('/Courses').add({...courseToAdd});
  }

  updateCourse(id: string, course: Course) {
    return this.dataBase.doc(`/Courses/${id}`).update(course);
  }

  removeCourse(id: string) {
    return this.dataBase.doc(`/Courses/${id}`).delete();
  }

  rateCourse(id: string, rating: number) {
    this.getCourse(id).subscribe(course => {
      course.ratingSum += rating;
      course.ratingCount += 1;
      this.dataBase.doc(`/Courses/${id}`).update({ ...course });
    });
  }

  enroll(id: string) {
    this.getCourse(id).subscribe(course => {
      course.studentsEnrolled += 1;
      this.dataBase.doc(`/Courses/${id}`).update({ ...course });
    });
  }

}
