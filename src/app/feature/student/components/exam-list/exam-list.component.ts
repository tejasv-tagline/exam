import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ACTION } from 'src/app/shared/interfaces/enums';
import { Router } from '@angular/router';

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
  columns = [
    {
      label: 'No.',
      field: 'no',
      type: 'serial',
    },
    {
      field: 'subjectName',
      label: 'Subject Name',
    },
    {
      field: 'action',
      label: 'Action',
      type: 'action',
      actions: [
        {
          icon: 'fa-solid fa-pencil',
          label: ACTION.START_EXAM,
        },
      ],
    },
  ];
  exams: any;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.studentService.getExams().subscribe((res) => {
      if (res?.data) {
        this.exams = res.data;
      }
    });
  }

  actionClick(action: any) {
    switch (action.label) {
      case ACTION.START_EXAM:
        this.router.navigate(['student/exams', action.data._id]);
    }
  }
}
