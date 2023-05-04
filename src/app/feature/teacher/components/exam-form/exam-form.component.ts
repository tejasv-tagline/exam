import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent {
  examForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar
  ) {
    this.examForm = this.fb.group({
      subjectName: [null, [Validators.required]],
      notes: this.fb.array([this.noteControl()]),
      questions: this.fb.array([this.questionControl()]),
    });
  }

  ngOnInit() {}

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
    console.log('this.fQuestions.length :>> ', this.fQuestions.length);
    if (this.fQuestions.valid) {
      this.fQuestions.push(this.questionControl());
      console.log('this.examForm.value :>> ', this.examForm.value);
    } else {
      console.error('IM ERROR');
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

  submit() {
    this.examForm.value.questions = this.examForm.value.questions.map(
      (question: any) => {
        question.answer = question.options[question.answer];
        question.options = Object.values(question.options);
        return question;
      }
    );
    console.log('this.examForm.value :>> ', this.examForm.value);

    this.teacherService.createExam(this.examForm.value).subscribe((res) => {
      if (res && res?.data) {
        this.snackBar.open('Exam Created Successfully !', 'OK');
      }
    });
  }
}
