import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.authService.login(this.form.value).subscribe((res) => {
      if (res?.data) {
        this.snackBar.open(res.message, 'OK', { duration: 3000 });
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', res.data.token);
        this.authService.setUser(JSON.stringify(res.data));
        this.authService.isAuthenticated();
        if (res.data.role === 'teacher') {
          this.router.navigate(['/teacher']);
        } else if (res.data.role === 'student') {
          this.router.navigate(['/student']);
        }
      }
    });
  }
}
