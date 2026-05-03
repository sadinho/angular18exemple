import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface ContactFormValue {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  agreeTerms: boolean;
}

@Component({
  selector: 'app-template-form-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template-form-lab.component.html',
  styleUrl: './template-form-lab.component.scss'
})
export class TemplateFormLabComponent {
  @ViewChild('contactForm')
  contactForm!: NgForm;

  submitted = signal(false);
  savedValue = signal<ContactFormValue | null>(null);

  model: ContactFormValue = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
    agreeTerms: false
  };

  readonly priorityOptions = [
    { label: 'Baixa', value: 'low' as const },
    { label: 'Média', value: 'medium' as const },
    { label: 'Alta', value: 'high' as const }
  ];

  fillExample(): void {
    this.model = {
      fullName: 'João Estudo',
      email: 'joao@study.dev',
      subject: 'Template Forms vs Reactive',
      message: 'Exemplo de formulário template-driven para comparação didática.',
      priority: 'high',
      agreeTerms: true
    };
    this.submitted.set(false);
  }

  resetForm(): void {
    this.contactForm.resetForm();
    this.model = {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
      agreeTerms: false
    };
    this.savedValue.set(null);
    this.submitted.set(false);
  }

  submitForm(): void {
    this.submitted.set(true);

    if (this.contactForm.invalid) {
      this.contactForm.form.markAllAsTouched();
      return;
    }

    this.savedValue.set({ ...this.model });
  }

  hasError(fieldName: 'fullName' | 'email' | 'subject' | 'message'): boolean {
    const field = this.contactForm?.form?.controls?.[fieldName];
    return !!(field?.touched && field?.invalid);
  }
}
