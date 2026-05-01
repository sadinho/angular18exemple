import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith } from 'rxjs';

interface StudyFormValue {
  fullName: string;
  email: string;
  role: 'student' | 'developer' | 'architect';
  favoriteTopic: 'signals' | 'rxjs' | 'forms';
  newsletter: boolean;
  notes: string;
}

@Component({
  selector: 'app-reactive-form-lab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-form-lab.component.html',
  styleUrl: './reactive-form-lab.component.scss'
})
export class ReactiveFormLabComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);
  savedValue = signal<StudyFormValue | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    role: this.fb.nonNullable.control<StudyFormValue['role']>('student', [Validators.required]),
    favoriteTopic: this.fb.nonNullable.control<StudyFormValue['favoriteTopic']>('signals', [Validators.required]),
    newsletter: this.fb.nonNullable.control(true),
    notes: this.fb.nonNullable.control('', [Validators.maxLength(160)])
  });

  readonly preview$ = this.form.valueChanges.pipe(startWith(this.form.getRawValue()));

  readonly roleOptions = [
    { label: 'Estudante', value: 'student' as const },
    { label: 'Desenvolvedor', value: 'developer' as const },
    { label: 'Arquiteto', value: 'architect' as const }
  ];

  readonly topicOptions = [
    { label: 'Signals', value: 'signals' as const },
    { label: 'RxJS', value: 'rxjs' as const },
    { label: 'Forms', value: 'forms' as const }
  ];

  fillExample(): void {
    this.form.patchValue({
      fullName: 'Ana Study',
      email: 'ana@study.dev',
      role: 'developer',
      favoriteTopic: 'forms',
      newsletter: false,
      notes: 'Exemplo de preenchimento para estudo.'
    });
    this.submitted.set(false);
  }

  resetForm(): void {
    this.form.reset({
      fullName: '',
      email: '',
      role: 'student',
      favoriteTopic: 'signals',
      newsletter: true,
      notes: ''
    });
    this.savedValue.set(null);
    this.submitted.set(false);
  }

  submitForm(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.savedValue.set(this.form.getRawValue());
  }

  hasError(controlName: 'fullName' | 'email' | 'notes'): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.invalid;
  }
}
