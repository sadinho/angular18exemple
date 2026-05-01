import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
  });

  // Lista apresentacional: confirma que o card é renderizado a partir do input.
  it('should render the user cards', () => {
    fixture.componentRef.setInput('users', [
      { id: 1, name: 'Ana', email: 'ana@example.com', phone: '123', company: { name: 'ACME' } }
    ]);
    fixture.componentRef.setInput('total', 1);
    fixture.componentRef.setInput('selectedUserId', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ana');
    expect(compiled.textContent).toContain('ACME');
  });

  // Ações do card: o componente emite eventos e o container decide o que fazer.
  it('should emit events when selecting a user or opening posts', () => {
    fixture.componentRef.setInput('users', [
      { id: 1, name: 'Ana', email: 'ana@example.com' }
    ]);
    fixture.componentRef.setInput('total', 1);
    fixture.componentRef.setInput('selectedUserId', null);
    fixture.detectChanges();

    const selectedIds: number[] = [];
    const postIds: number[] = [];
    fixture.componentInstance.selectUser.subscribe((id) => selectedIds.push(id));
    fixture.componentInstance.showUserPosts.subscribe((id) => postIds.push(id));

    const header = fixture.nativeElement.querySelector('.card-header') as HTMLElement;
    header.click();

    const button = fixture.nativeElement.querySelector('.btn-small') as HTMLButtonElement;
    button.click();

    expect(selectedIds).toEqual([1]);
    expect(postIds).toEqual([1]);
  });
});
