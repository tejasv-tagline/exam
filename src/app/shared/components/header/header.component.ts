import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter();
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.toggle.emit(true);
  }

  logout() {
    console.log('Logout');
    this.authService.logout();
  }
}
