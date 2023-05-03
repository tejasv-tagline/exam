import { MatPaginator } from '@angular/material/paginator';
import { TeacherService } from './../../services/teacher.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  displayedColumns: string[] = ['no', 'name', 'email', 'action'];
  students = new MatTableDataSource<any, any>();
  @ViewChild('studentPaginator') paginator!: MatPaginator;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.teacherService.getStudents().subscribe((res) => {
      this.students = new MatTableDataSource(res.data);
      setTimeout(() => (this.students.paginator = this.paginator));
    });
  }
}
