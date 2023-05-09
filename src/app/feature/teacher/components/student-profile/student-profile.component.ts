import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent {
  breadCrumb = [
    {
      label: 'Students',
      url: '/teacher/students',
    },
    {
      label: 'Profile',
      isActive: true,
    },
  ];
  data = {
    isEditable: true,
    _id: '6458910ff4c47c60e1f7de76',
    name: 'Tejas Student',
    email: 'tjv+1@taglineinfotech.com',
    role: 'student',
    profileImage:
      'http://res.cloudinary.com/dxcf9jaog/image/upload/v1683525903/express-mongodb-demo/profiles/profile_1683525902462.jpg',
  };
  studentId!: string;
  studentDetails: any;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res) => {
      console.log('res :>> ', res);
      if (res?.['studentId']) {
        this.studentId = res['studentId'];
        this.getStudentDetails();
      }
    });
  }

  getStudentDetails() {
    this.teacherService.getStudentDetails(this.studentId).subscribe((res) => {
      console.log('res :>> ', res);
      if (res?.data) {
        this.studentDetails = { ...res.data[0], isEditable: false };
      }
    });
  }

  update(data: any) {
    console.log('data :>> ', data);
  }
}
