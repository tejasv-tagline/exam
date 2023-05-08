import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  items = [
    {
      label: 'Exams',
      url: 'teacher/exams',
      icon: 'fa-solid fa-book',
    },
    {
      label: 'students',
      url: 'teacher/students',
      icon: 'fa-solid fa-users',
    },
  ];
}
