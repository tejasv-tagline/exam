import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly baseURL = environment.baseURL + 'teacher/';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.baseURL + 'student-list');
  }

  getExams(): Observable<any> {
    return this.http.get(this.baseURL + 'exam-list');
  }

  getExamDetails(examId: string): Observable<any> {
    return this.http.get(this.baseURL + 'exam-detail', {
      params: { examId: examId },
    });
  }

  createExam(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'create-exam', data);
  }

  updateExam(data: any, examId: string) {
    return this.http.put(this.baseURL + 'edit-exam', data, {
      params: { examId: examId },
    });
  }

  deleteExam(examId: string): Observable<any> {
    return this.http.delete(this.baseURL + 'delete-exam', {
      params: { examId: examId },
    });
  }
}
