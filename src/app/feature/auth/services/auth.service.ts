import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURL = environment.baseURL;

  private currentUserSubject$ = new BehaviorSubject<any>(
    localStorage.getItem('user') || null
  );
  currentUser$ = this.currentUserSubject$.pipe(
    map((data) => (data = JSON.parse(data)))
  );

  isAuthenticatedSubject$ = new BehaviorSubject<boolean>(
    localStorage.getItem('user') ? true : false
  );
  isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'auth/signin', data);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    this.isAuthenticatedSubject$.next(
      localStorage.getItem('user') ? true : false
    );
  }

  setUser(user: any) {
    this.currentUserSubject$.next(user);
  }

  logout() {
    try {
      localStorage.clear();
      this.isAuthenticated();
      this.router.navigate(['/auth/login']);
    } catch {
      console.error('Error logout');
    }
  }
}
