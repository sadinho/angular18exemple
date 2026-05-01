import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-users-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss'
})
export class UsersFilterComponent {
  // Inputs e outputs mantêm o componente simples e reutilizável.
  searchTerm = input<string>('');
  searchChanged = output<string>();
  resetClicked = output<void>();
  reloadClicked = output<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchChanged.emit(target.value);
  }
}
