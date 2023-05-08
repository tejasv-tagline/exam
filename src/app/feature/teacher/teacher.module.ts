import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';
import { MatModule } from 'src/app/core/mat/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ExamsComponent,
    StudentsComponent,
    StudentProfileComponent,
    ExamFormComponent,
  ],

  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
  ],
})
export class TeacherModule {}
