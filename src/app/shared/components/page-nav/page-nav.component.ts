import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PageNavLink {
  label: string;
  route: string;
}

// Componente de apresentação reutilizável: recebe dados por input e só renderiza links.
@Component({
  selector: 'app-page-nav',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.scss'
})
export class PageNavComponent {
  title = input<string>('Navegacao');
  links = input<PageNavLink[]>([]);
}
