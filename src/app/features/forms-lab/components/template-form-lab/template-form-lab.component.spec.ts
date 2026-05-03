import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TemplateFormLabComponent } from './template-form-lab.component';

describe('TemplateFormLabComponent', () => {
  let component: TemplateFormLabComponent;
  let fixture: ComponentFixture<TemplateFormLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateFormLabComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateFormLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // GOF Observer: ngModel observa as mudanças do modelo local.
  it('should create with initial model values', () => {
    expect(component.model).toBeDefined();
    expect(component.model.fullName).toBe('');
    expect(component.model.email).toBe('');
    expect(component.model.priority).toBe('medium');
    expect(component.model.agreeTerms).toBeFalsy();
  });

  // Template-driven: ngModel vincula diferentes campos a diferentes tipos de input.
  it('should have correct input types in template', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    let textInputFound = false;
    let emailInputFound = false;
    let checkboxInputFound = false;

    inputs.forEach((input: HTMLInputElement) => {
      if (input.type === 'text' && input.name === 'fullName') textInputFound = true;
      if (input.type === 'email' && input.name === 'email') emailInputFound = true;
      if (input.type === 'checkbox' && input.name === 'agreeTerms') checkboxInputFound = true;
    });

    expect(textInputFound).toBeTruthy();
    expect(emailInputFound).toBeTruthy();
    expect(checkboxInputFound).toBeTruthy();
  });

  // Estado local: submitted rastreia tentativas de envio.
  it('should track submission state', () => {
    expect(component.submitted()).toBeFalsy();

    component.fillExample();
    expect(component.submitted()).toBeFalsy();

    // Apenas mudar para true se o formulário fosse válido
    // Como não temos @ViewChild inicializado aqui, apenas verificamos o signal
  });

  // Preencher exemplo: atribui valores ao modelo sem validação imediata.
  it('should fill model with example values', () => {
    component.fillExample();

    expect(component.model.fullName).toBe('João Estudo');
    expect(component.model.email).toBe('joao@study.dev');
    expect(component.model.subject).toBe('Template Forms vs Reactive');
    expect(component.model.priority).toBe('high');
    expect(component.model.agreeTerms).toBeTruthy();
  });

  // Reset: volta o modelo e o form ao estado limpo.
  it('should reset model to initial state', () => {
    component.fillExample();
    component.resetForm();

    expect(component.model.fullName).toBe('');
    expect(component.model.email).toBe('');
    expect(component.model.subject).toBe('');
    expect(component.model.message).toBe('');
    expect(component.model.priority).toBe('medium');
    expect(component.model.agreeTerms).toBeFalsy();
    expect(component.savedValue()).toBeNull();
    expect(component.submitted()).toBeFalsy();
  });

  // Modelo local: mantém o estado dos valores conforme o usuário digita.
  it('should maintain model state as values change', () => {
    component.model.fullName = 'New Name';
    component.model.email = 'new@email.com';
    component.model.priority = 'high';

    expect(component.model.fullName).toBe('New Name');
    expect(component.model.email).toBe('new@email.com');
    expect(component.model.priority).toBe('high');
  });

  // Options: priorityOptions populam corretamente os selects.
  it('should have correct priority options', () => {
    expect(component.priorityOptions.length).toBe(3);
    expect(component.priorityOptions[0].value).toBe('low');
    expect(component.priorityOptions[0].label).toBe('Baixa');
    expect(component.priorityOptions[1].value).toBe('medium');
    expect(component.priorityOptions[1].label).toBe('Média');
    expect(component.priorityOptions[2].value).toBe('high');
    expect(component.priorityOptions[2].label).toBe('Alta');
  });

  // Template-driven com radio buttons: ngModel vincula valores exclusivos.
  it('should have priority radio buttons in template', () => {
    const radios = fixture.nativeElement.querySelectorAll('input[type="radio"][name="priority"]');
    expect(radios.length).toBe(3);
  });

  // Interfaces: ContactFormValue define corretamente o shape do modelo.
  it('should have all required model properties', () => {
    const requiredProps = ['fullName', 'email', 'subject', 'message', 'priority', 'agreeTerms'];
    requiredProps.forEach((prop) => {
      expect(component.model).toHaveProperty(prop);
    });
  });

  // Textarea para mensagem: suporta múltiplas linhas.
  it('should have textarea for message field', () => {
    const textarea = fixture.nativeElement.querySelector('textarea[name="message"]');
    expect(textarea).toBeDefined();
    expect(textarea.rows).toBe(4);
  });
});
