import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(environment.baseURL + 'teacher/student-list');
  }

  getExams(): Observable<any> {
    return this.http.get(environment.baseURL + 'teacher/exam-list');
  }

  getExamDetails(examId: string): Observable<any> {
    return this.http.get(environment.baseURL + 'teacher/exam-detail', {
      params: { examId: examId },
    });
  }

  createExam(data: any): Observable<any> {
    return this.http.post(environment.baseURL + 'teacher/create-exam', data);
  }

  updateExam(data: any, examId: string) {
    return this.http.put(environment.baseURL + 'teacher/edit-exam', data, {
      params: { examId: examId },
    });
  }
}
