import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root',
})
export class ExamPaperResolver implements Resolve<boolean> {
  constructor(private studentService: StudentService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const examId = route.params['examId'];
    return this.studentService.startExam(examId).pipe(
      catchError((error) => {
        console.log('error :>> ', error);
        this.router.navigate(['/student/exams']);
        return of(null);
      })
    );
  }
}
