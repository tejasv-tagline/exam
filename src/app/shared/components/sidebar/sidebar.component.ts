import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

type role = 'student' | 'teacher';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  currentUser$ = this.authService.currentUser$;

  items = [
    {
      label: 'Exams',
      url: 'teacher/exams',
      icon: 'fa-solid fa-book',
      accessibleTo: 'teacher',
    },
    {
      label: 'students',
      url: 'teacher/students',
      icon: 'fa-solid fa-users',
      accessibleTo: 'teacher',
    },
    {
      label: 'Exams',
      url: 'student',
      icon: 'fa-solid fa-book',
      accessibleTo: 'student',
    },
  ];

  constructor(private authService: AuthService) {}
}
