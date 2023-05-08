import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent {
  breadCrumb: any = [
    {
      label: 'Exams',
      isActive: true,
    },
  ];
  displayedColumns: string[] = ['no', 'subjectName', 'action'];

  exams = new MatTableDataSource<any, any>();
  @ViewChild('examPaginator') paginator!: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.studentService.getExams().subscribe((res) => {
      console.log('res :>> ', res);
      if (res?.data) {
        this.exams = new MatTableDataSource(res.data);
        setTimeout(() => (this.exams.paginator = this.paginator));
      }
    });
  }
}
