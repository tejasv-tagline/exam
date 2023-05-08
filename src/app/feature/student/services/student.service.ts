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

  startExam(examId: string): Observable<any> {
    return this.http.get(this.baseURL + 'start-exam', {
      params: { examId: examId },
    });
  }

  endExam(data: any, examId: string): Observable<any> {
    return this.http.post(this.baseURL + 'end-exam', data, {
      params: {
        examId: examId,
      },
    });
  }
}
