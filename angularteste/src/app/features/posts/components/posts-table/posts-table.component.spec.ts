import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsTableComponent } from './posts-table.component';

describe('PostsTableComponent', () => {
  let fixture: ComponentFixture<PostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsTableComponent);
  });

  // Renderização tabular: o componente só apresenta dados prontos vindos do container.
  it('should render rows for the provided posts', () => {
    fixture.componentRef.setInput('posts', [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' }
    ]);
    fixture.componentRef.setInput('total', 1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(1);
    expect(compiled.textContent).toContain('Post 1');
  });

  // Estado de filtragem: mostra a diferença entre total geral e itens visíveis.
  it('should show filtered count when items are filtered', () => {
    fixture.componentRef.setInput('posts', [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' }
    ]);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mostrando 1 de 10');
  });
});
