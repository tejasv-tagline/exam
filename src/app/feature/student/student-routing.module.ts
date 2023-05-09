import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { ResultsComponent } from './components/results/results.component';
import { ExamPaperResolver } from './resolvers/exam-paper.resolver';

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
    resolve: [ExamPaperResolver],
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
