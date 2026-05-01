import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalLabComponent } from './signal-lab.component';

describe('SignalLabComponent', () => {
  let fixture: ComponentFixture<SignalLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignalLabComponent);
    fixture.detectChanges();
  });

  // Signals locais: este teste mostra a atualização reativa do contador.
  it('should increment the counter when the button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    buttons[0]?.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Contador: 1');
    expect(compiled.textContent).toContain('Contador * 2: 2');
  });

  // Computed + input binding: o campo altera o estado e os valores derivados acompanham.
  it('should update derived state when the input changes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input') as HTMLInputElement;

    input.value = 'Angular';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Nome digitado: Angular');
    expect(compiled.textContent).toContain('Comprimento do nome: 7');
  });
});
