import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        redirectTo: 'exams',
        pathMatch: 'full',
      },
      {
        path: 'exams',
        component: ExamsComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'students/:id',
        component: StudentProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
