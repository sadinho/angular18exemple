import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageNavComponent, PageNavLink } from '../../../shared/components/page-nav/page-nav.component';
import { ReactiveFormLabComponent } from '../components/reactive-form-lab/reactive-form-lab.component';
import { TemplateFormLabComponent } from '../components/template-form-lab/template-form-lab.component';

@Component({
  selector: 'app-forms-lab-page',
  standalone: true,
  imports: [ReactiveFormLabComponent, TemplateFormLabComponent, PageNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forms-lab-page.component.html',
  styleUrl: './forms-lab-page.component.scss'
})
export class FormsLabPageComponent {
  navLinks: PageNavLink[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Posts', route: '/posts' },
    { label: 'Usuarios', route: '/users' },
    { label: 'RxJS Lab', route: '/rxjs-lab' }
  ];
}
