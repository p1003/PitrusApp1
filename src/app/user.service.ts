import { Injectable } from '@angular/core';
import { User } from './user';
import {CourseService} from './course.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = null;

  constructor(private courseService: CourseService, private dataBase: AngularFirestore, public afAuth: AngularFireAuth) {
    this.getUser();
  }

  getUser() {
    this.afAuth.authState.subscribe(authData => {
      if (authData) {
        const email = authData.email;
        this.getUserData(email);
      } else {
        this.user = null;
      }
    });
  }

  getUserData(email) {
    return this.dataBase.collection('/Users').get().pipe(map(data => {
      data.forEach(item => {
        if (item.data().email === email) { this.user = item.data(); this.user.id = item.id; }
      });
      return this.user;
    }));
  }

  signInUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => this.getUser());
  }

  registerUser(email, password) {
    const user = { email, role: 'user', courses: [] };
    this.dataBase.collection('/Users').add({ ...user });
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.afAuth.auth.signOut();
  }

  enroll(id: string) {
    if (this.user) {
      this.user.courses.push({ id });
      this.dataBase.doc(`/Users/${this.user.id}`).update({ ...this.user });
      this.courseService.enroll(id);
    }
  }

  isEnrolled(id: string) {
    if (this.user && this.user.courses.find(course => course.id === id)) {
      return true;
    }
    return false;
  }

  getRating(id: string) {
    if (this.user) {
      return this.user.courses.find(course => course.id === id).rate;
    }
    return undefined;
  }

  setRating(id: string, rating: number) {
    if (this.user) {
      this.courseService.rateCourse(id, rating);
      const courseRating = this.user.courses.find(course => course.id === id);
      courseRating.rate = rating;
      console.log(courseRating);
      this.dataBase.doc(`/Users/${this.user.id}`).update(this.user);
    }
  }
}
