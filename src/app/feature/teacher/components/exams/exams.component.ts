import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from '../../services/teacher.service';
import { ACTION } from 'src/app/shared/interfaces/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent {
  exams: any;
  breadCrumb: any = [
    {
      label: 'Exams',
      isActive: true,
    },
  ];
  columns = [
    {
      field: 'no',
      label: 'No.',
      type: 'serial',
    },
    {
      field: 'subjectName',
      label: 'Subject Name',
      type: 'sdd',
    },
    {
      field: 'action',
      type: 'action',
      label: 'Action',
      actions: [
        {
          label: ACTION.VIEW,
          icon: 'fa-solid fa-eye',
        },
        {
          label: ACTION.DELETE,
          icon: 'fa-solid fa-trash',
        },
        {
          label: ACTION.RESULTS,
          icon: 'fa-solid fa-square-poll-horizontal',
        },
      ],
    },
  ];

  constructor(
    private teacherService: TeacherService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.teacherService.getExams().subscribe((res) => {
      if (res?.data) {
        this.exams = res.data;
      }
    });
  }

  actionClick(action: any) {
    switch (action.label) {
      case ACTION.VIEW:
        this.router.navigate(['teacher/exams', action.data._id]);
        break;
      case ACTION.DELETE:
        this.deleteExam(action.data._id);
        break;
      case ACTION.RESULTS:
        this.router.navigate(['teacher/exams/' + action.data._id + '/results']);
    }
  }

  deleteExam(examId: string) {
    this.teacherService.deleteExam(examId).subscribe((res) => {
      console.log('res :>> ', res);
      if (res) {
        this.snackbar.open('Exam Deleted Successfully !', 'OK');
        this.getExams();
      }
    });
  }
}
