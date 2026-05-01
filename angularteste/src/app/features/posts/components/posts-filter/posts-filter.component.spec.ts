import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsFilterComponent } from './posts-filter.component';

describe('PostsFilterComponent', () => {
  let fixture: ComponentFixture<PostsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsFilterComponent);
    fixture.detectChanges();
  });

  // Evento de saída: o componente não sabe quem o consome, apenas emite a busca digitada.
  it('should emit the typed search term', () => {
    const emittedValues: string[] = [];
    fixture.componentInstance.searchChanged.subscribe((value) => emittedValues.push(value));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'angular';
    input.dispatchEvent(new Event('input'));

    expect(emittedValues).toEqual(['angular']);
  });

  // Botão de reset: reforça que o estado do filtro fica no container, não no componente.
  it('should emit resetClicked when the reset button is pressed', () => {
    let resetCount = 0;
    fixture.componentInstance.resetClicked.subscribe(() => {
      resetCount += 1;
    });

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(resetCount).toBe(1);
  });
});
