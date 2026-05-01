import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFilterComponent } from './users-filter.component';

describe('UsersFilterComponent', () => {
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFilterComponent);
    fixture.detectChanges();
  });

  // Busca local: o valor digitado vai para o container via output, sem acoplamento.
  it('should emit the search term when typing', () => {
    const emittedValues: string[] = [];
    fixture.componentInstance.searchChanged.subscribe((value) => emittedValues.push(value));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'ana';
    input.dispatchEvent(new Event('input'));

    expect(emittedValues).toEqual(['ana']);
  });

  // Recarregar é uma ação do container, aqui o componente apenas repassa o evento.
  it('should emit reloadClicked when the reload button is pressed', () => {
    let reloadCount = 0;
    fixture.componentInstance.reloadClicked.subscribe(() => {
      reloadCount += 1;
    });

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1]?.click();

    expect(reloadCount).toBe(1);
  });
});
