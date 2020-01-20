import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesAdminComponent } from './courses-admin/courses-admin.component';

const routes: Routes = [
  {path: 'Courses', component: CoursesComponent},
  {path: 'Registration', component: RegistrationComponent},
  {path: 'Logging', component: LoggingComponent},
  {path: 'Details/:id', component: CourseDetailComponent},
  {path: 'CoursesAdmin', component: CoursesAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
