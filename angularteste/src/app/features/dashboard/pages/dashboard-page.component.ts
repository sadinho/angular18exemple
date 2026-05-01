import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StudyAccessPanelComponent } from '../../../core/components/study-access-panel.component';
import { PageNavComponent, PageNavLink } from '../../../shared/components/page-nav/page-nav.component';
import { SignalLabComponent } from '../components/signal-lab/signal-lab.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [SignalLabComponent, StudyAccessPanelComponent, PageNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  // Container page: monta a tela a partir de componentes menores.
  // GOF Composite: a tela final é composta por subcomponentes reutilizáveis.
  navLinks: PageNavLink[] = [
    { label: 'Ir para Posts (com Tabela)', route: '/posts' },
    { label: 'Ir para Forms Lab', route: '/forms-lab' },
    { label: 'Ir para RxJS Lab', route: '/rxjs-lab' },
    { label: 'Ir para Usuarios', route: '/users' }
  ];
}
