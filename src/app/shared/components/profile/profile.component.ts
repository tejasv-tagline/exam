import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatModule } from 'src/app/core/mat/mat.module';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileData: any;
  isEditable: boolean = false;

  profileForm!: FormGroup;

  @Input() set profile(value: any) {
    this.profileData = value;
    this.profileForm.patchValue(value);
    this.isEditable = value.isEditable;
  }
  @Output() onUpdate = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.profileForm.disable();
  }

  submit() {
    this.onUpdate.emit(this.profileForm.value);
  }
}
