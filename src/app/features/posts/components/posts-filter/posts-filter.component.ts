import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-posts-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './posts-filter.component.html',
  styleUrl: './posts-filter.component.scss'
})
export class PostsFilterComponent {
  // Inputs e outputs deixam este componente desacoplado do container.
  searchTerm = input<string>('');
  searchChanged = output<string>();
  resetClicked = output<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchChanged.emit(target.value);
  }
}
