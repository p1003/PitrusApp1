import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ScoreBarComponent } from './score-bar/score-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CourseBarComponent } from './course-bar/course-bar.component';
import { CourseCreatorComponent } from './course-creator/course-creator.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { CoursesAdminComponent } from './courses-admin/courses-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    ScoreBarComponent,
    SearchBarComponent,
    CourseBarComponent,
    CourseCreatorComponent,
    RegistrationComponent,
    LoggingComponent,
    NavBarComponent,
    CoursesAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule, // do obslugi baz danych
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    HttpClientModule
    // do obslugi baz danych
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
