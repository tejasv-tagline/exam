import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent {
  examForm!: FormGroup;
  examId!: string;
  mode: string = 'create';

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.examForm = this.fb.group({
      subjectName: [null, [Validators.required]],
      notes: this.fb.array([this.noteControl()]),
      questions: this.fb.array([this.questionControl()]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res?.examId !== 'new') {
        console.log('res :>> ', res);
        this.examId = res.examId;
        this.mode = 'view';
        this.getExamDetails();
      }
    });
  }

  getExamDetails() {
    this.teacherService.getExamDetails(this.examId).subscribe((res) => {
      if (res && res.data) {
        res.data.notes.forEach((note: string, index: number) => {
          index && this.fNotes.push(this.noteControl());
        });
        this.examForm.patchValue(this.createFormData(res.data));
        this.examForm.disable();
      }
    });
  }

  createFormData(data: any) {
    data.questions = data.questions.map((question: any, index: number) => {
      index && this.fQuestions.push(this.questionControl());
      const map: any = {};
      question.options = {
        a: question.options[0],
        b: question.options[1],
        c: question.options[2],
        d: question.options[3],
      };
      for (let i in question.options) {
        map[question.options[i]] = i;
      }
      question.answer = map[question.answer];
      return question;
    });
    return data;
  }

  get fNotes() {
    return this.examForm.controls['notes'] as FormArray;
  }

  get fQuestions() {
    return this.examForm.controls['questions'] as FormArray;
  }

  questionControl() {
    return this.fb.group({
      question: [null, [Validators.required]],
      options: this.fb.group({
        a: [null, [Validators.required]],
        b: [null, [Validators.required]],
        c: [null, [Validators.required]],
        d: [null, [Validators.required]],
      }),
      answer: [null, [Validators.required]],
    });
  }

  addQuestion() {
    if (this.fQuestions.valid) {
      this.fQuestions.push(this.questionControl());
    } else {
      this.snackBar.open('Please Fill Above Question First !', 'OK');
    }
  }

  removeQuestion(index: number) {
    this.fQuestions.removeAt(index);
  }

  noteControl() {
    return new FormControl(null, Validators.required);
  }

  addNote() {
    if (this.fNotes.valid) {
      this.fNotes.push(this.noteControl());
    }
  }

  removeNote(index: number) {
    this.fNotes.removeAt(index);
  }

  editExam() {
    this.examForm.enable();
    this.mode = 'edit';
  }

  submit() {
    this.examForm.value.questions = this.examForm.value.questions.map(
      (question: any) => {
        question.answer = question.options[question.answer];
        question.options = Object.values(question.options);
        return question;
      }
    );
    if (this.mode === 'create') {
      this.teacherService.createExam(this.examForm.value).subscribe((res) => {
        if (res && res?.data) {
          this.snackBar.open('Exam Created Successfully !', 'OK');
          this.examId = res.data._id;
          this.enableViewMode();
        }
      });
    } else {
      this.teacherService
        .updateExam(this.examForm.value, this.examId)
        .subscribe((res: any) => {
          if (res && res?.data) {
            this.snackBar.open('Exam Updated Successfully !', 'OK');
            this.mode = 'view';
            this.examForm.disable();
          }
        });
    }
  }

  enableViewMode() {
    this.router.navigate(['teacher/exams/' + this.examId]);
  }
}
