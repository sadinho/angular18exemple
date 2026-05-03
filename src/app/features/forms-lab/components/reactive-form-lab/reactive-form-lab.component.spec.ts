import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormLabComponent } from './reactive-form-lab.component';

describe('ReactiveFormLabComponent', () => {
  let component: ReactiveFormLabComponent;
  let fixture: ComponentFixture<ReactiveFormLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormLabComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // GOF Observer: a validação via FormBuilder observa as mudanças do form.
  it('should create with a valid form group', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('fullName')).toBeDefined();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.valid).toBeFalsy();
  });

  // Validação programática: FormBuilder aplica Validators na criação.
  it('should validate required fields', () => {
    expect(component.form.get('fullName')?.hasError('required')).toBeTruthy();
    expect(component.form.get('email')?.hasError('required')).toBeTruthy();

    component.form.patchValue({
      fullName: 'Valid Name',
      email: 'valid@email.com'
    });

    expect(component.form.get('fullName')?.hasError('required')).toBeFalsy();
    expect(component.form.get('email')?.hasError('required')).toBeFalsy();
  });

  // Validação de email: Validators.email rejeita emails inválidos.
  it('should validate email format', () => {
    const emailControl = component.form.get('email');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  // Validação de minlength: rejeita nomes com menos de 3 caracteres.
  it('should validate fullName minlength', () => {
    const fullNameControl = component.form.get('fullName');

    fullNameControl?.setValue('ab');
    expect(fullNameControl?.hasError('minlength')).toBeTruthy();

    fullNameControl?.setValue('abc');
    expect(fullNameControl?.hasError('minlength')).toBeFalsy();
  });

  // Estado local com Signals: submitted rastreia se o form foi submetido.
  it('should track submission state with signal', () => {
    expect(component.submitted()).toBeFalsy();

    component.fillExample();
    expect(component.submitted()).toBeFalsy();

    component.submitForm();
    expect(component.submitted()).toBeTruthy();
  });

  // Preencher exemplo: patchValue altera valores sem disparar validação inicial.
  it('should fill form with example values', () => {
    component.fillExample();

    expect(component.form.get('fullName')?.value).toBe('Ana Study');
    expect(component.form.get('email')?.value).toBe('ana@study.dev');
    expect(component.form.get('role')?.value).toBe('developer');
    expect(component.form.get('favoriteTopic')?.value).toBe('forms');
    expect(component.form.get('newsletter')?.value).toBeFalsy();
  });

  // Reset do formulário: volta ao estado inicial.
  it('should reset form to initial state', () => {
    component.fillExample();
    component.resetForm();

    expect(component.form.get('fullName')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.savedValue()).toBeNull();
    expect(component.submitted()).toBeFalsy();
  });

  // Submissão válida: salva o valor quando todos os validadores passam.
  it('should save form value on valid submission', () => {
    component.form.patchValue({
      fullName: 'Test User',
      email: 'test@example.com',
      role: 'student',
      favoriteTopic: 'signals',
      newsletter: true,
      notes: 'Note'
    });

    component.submitForm();

    expect(component.submitted()).toBeTruthy();
    expect(component.savedValue()).not.toBeNull();
    expect(component.savedValue()?.fullName).toBe('Test User');
  });

  // Submissão inválida: não salva se há erros.
  it('should not save invalid form on submission', () => {
    component.form.patchValue({
      fullName: '',
      email: 'invalid'
    });

    component.submitForm();

    expect(component.submitted()).toBeTruthy();
    expect(component.savedValue()).toBeNull();
  });

  // hasError util: detecta campos com erro e touch.
  it('should detect field errors correctly', () => {
    const fullNameControl = component.form.get('fullName');
    fullNameControl?.markAsTouched();

    expect(component.hasError('fullName')).toBeTruthy();

    fullNameControl?.setValue('Valid Name');
    expect(component.hasError('fullName')).toBeFalsy();
  });

  // Role options estão populadas corretamente.
  it('should have correct role options', () => {
    expect(component.roleOptions.length).toBe(3);
    expect(component.roleOptions[0].value).toBe('student');
    expect(component.roleOptions[1].value).toBe('developer');
    expect(component.roleOptions[2].value).toBe('architect');
  });

  // Favorite topic options estão populadas corretamente.
  it('should have correct topic options', () => {
    expect(component.topicOptions.length).toBe(3);
    expect(component.topicOptions[0].value).toBe('signals');
    expect(component.topicOptions[1].value).toBe('rxjs');
    expect(component.topicOptions[2].value).toBe('forms');
  });
});
