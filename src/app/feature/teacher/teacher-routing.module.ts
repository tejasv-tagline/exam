import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
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
    path: 'exams/:examId',
    component: ExamFormComponent,
  },
  {
    path: 'exams/new',
    component: ExamFormComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'students/:studentId',
    component: StudentProfileComponent,
  },
  {
    path: 'exams/:examId/results',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
