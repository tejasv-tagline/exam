import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

@NgModule({
  declarations: [TeacherComponent, ExamsComponent, StudentsComponent, StudentProfileComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class TeacherModule {}
