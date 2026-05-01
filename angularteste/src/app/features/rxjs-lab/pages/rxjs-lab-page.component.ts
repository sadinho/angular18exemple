import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageNavComponent, PageNavLink } from '../../../shared/components/page-nav/page-nav.component';
import { RxjsLabComponent } from '../components/rxjs-lab/rxjs-lab.component';

@Component({
  selector: 'app-rxjs-lab-page',
  standalone: true,
  imports: [RxjsLabComponent, PageNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rxjs-lab-page.component.html',
  styleUrl: './rxjs-lab-page.component.scss'
})
export class RxjsLabPageComponent {
  navLinks: PageNavLink[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Forms Lab', route: '/forms-lab' },
    { label: 'Posts', route: '/posts' },
    { label: 'Usuarios', route: '/users' }
  ];
}
