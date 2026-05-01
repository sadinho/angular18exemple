import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageNavComponent } from './page-nav.component';

describe('PageNavComponent', () => {
  let fixture: ComponentFixture<PageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNavComponent);
  });

  // Componente de apresentação: valida se os dados recebidos viram links na tela.
  it('should render the provided links', () => {
    fixture.componentRef.setInput('title', 'Navegacao');
    fixture.componentRef.setInput('links', [
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'Posts', route: '/posts' }
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Navegacao');
    expect(compiled.querySelectorAll('a').length).toBe(2);
    expect(compiled.querySelectorAll('a')[0]?.textContent).toContain('Dashboard');
  });
});
