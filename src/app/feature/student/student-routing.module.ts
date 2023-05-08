import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'exams',
    pathMatch: 'full',
  },
  {
    path: 'exams',
    component: ExamListComponent,
  },
  {
    path: 'exams/:examId',
    component: ExamPaperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}