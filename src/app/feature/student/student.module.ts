import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { MatModule } from 'src/app/core/mat/mat.module';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExamListComponent, ExamPaperComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    BreadcrumbComponent,
    MatModule,
    ReactiveFormsModule,
  ],
})
export class StudentModule {}
