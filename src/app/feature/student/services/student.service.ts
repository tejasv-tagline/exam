import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly baseURL = environment.baseURL + 'student/';

  constructor(private http: HttpClient) {}

  getExams(): Observable<any> {
    return this.http.get(this.baseURL + 'all-exam-list');
  }
}
