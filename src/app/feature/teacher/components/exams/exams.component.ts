import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent {
  displayedColumns: string[] = ['no', 'subjectName', 'action'];
  exams = new MatTableDataSource<any, any>();
  @ViewChild('examPaginator') paginator!: MatPaginator;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.teacherService.getExams().subscribe((res) => {
      this.exams = new MatTableDataSource(res.data);
      setTimeout(() => (this.exams.paginator = this.paginator));
    });
  }
}
