import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { MatModule } from 'src/app/core/mat/mat.module';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { DataTableComponent } from 'src/app/shared/components/table/datatable.component';

@NgModule({
  declarations: [ExamListComponent, ExamPaperComponent, ResultsComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    BreadcrumbComponent,
    MatModule,
    ReactiveFormsModule,
    DataTableComponent,
  ],
})
export class StudentModule {}
