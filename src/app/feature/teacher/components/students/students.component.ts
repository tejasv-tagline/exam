import { MatPaginator } from '@angular/material/paginator';
import { TeacherService } from './../../services/teacher.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ACTION } from 'src/app/shared/interfaces/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students: any;
  breadCrumb = [
    {
      label: 'Students',
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
      field: 'name',
      label: 'Student Name',
      type: 'img',
      imgPath: 'profileImage',
    },
    {
      field: 'email',
      label: 'Email',
    },
    {
      field: 'action',
      label: 'Action',
      type: 'action',
      actions: [
        {
          label: ACTION.VIEW,
          icon: 'fa-solid fa-eye',
        },
      ],
    },
  ];

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.teacherService.getStudents().subscribe((res) => {
      this.students = res.data;
    });
  }

  actionClick(action: any) {
    switch (action.label) {
      case ACTION.VIEW:
        this.router.navigate(['teacher/students', action.data._id]);
        break;
    }
  }
}
