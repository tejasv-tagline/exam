import { Component, ElementRef } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.scss'],
})
export class ExamPaperComponent {
  examId!: string;
  examForm!: FormGroup;
  breadCrumb = [
    {
      label: 'Exams',
      isActive: false,
    },
    {
      label: 'Started',
      isActive: true,
    },
  ];
  isStarted: boolean = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private elRef: ElementRef,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.examForm = this.fb.group({
      answers: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res?.examId) {
        this.examId = res['examId'];
        this.getQuestions();
      }
    });
  }

  getQuestions() {
    this.studentService.startExam(this.examId).subscribe((res) => {
      if (res?.data) {
        res.data.forEach((question: any) => {
          this.addQuestionGroup(question);
        });
        this.startTimer(res.data.length * 60);
      }
    });
  }

  addQuestionGroup(data: any) {
    (this.examForm.controls['answers'] as FormArray).push(
      this.questionGroup(data)
    );
  }

  private questionGroup(data: any): FormGroup {
    return this.fb.group({
      questionId: [data.questionId],
      question: [data.question],
      options: [data.options],
      answer: [null, [Validators.required]],
    });
  }

  get fControls() {
    return this.examForm.controls['answers'] as FormArray;
  }

  startTimer(duration: any) {
    var timer = duration,
      minutes,
      seconds;
    const el = this.elRef.nativeElement.querySelector('#timer');
    setTimeout(() => {
      this.isStarted = true;
    }, 1000);
    const int = interval(1000).subscribe(() => {
      minutes = parseInt((timer / 60) as any, 10);
      seconds = parseInt((timer % 60) as any, 10);
      if (minutes === 0 && seconds === 0) {
        int.unsubscribe();
      }

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      el.textContent = minutes + ':' + seconds;
      if (--timer < 0) {
        timer = duration;
      }
    });
  }

  submit() {
    const data = this.examForm.value.answers.map((question: any) => {
      return {
        questionId: question.questionId,
        answer: question.answer,
      };
    });
    this.studentService
      .endExam({ answers: data }, this.examId)
      .subscribe((res) => {
        if (res?.data) {
          this.snackBar.open(res.message, 'OK', { duration: 5000 });
          this.router.navigate(['/student/exams']);
        }
      });
  }
}
