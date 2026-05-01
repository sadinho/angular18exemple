import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StudyAccessService } from '../services/study-access.service';

/**
 * Painel didatico para demonstrar um Guard.
 * Aqui o usuario habilita ou revoga o acesso antes de tentar abrir a rota protegida.
 */
@Component({
  selector: 'app-study-access-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './study-access-panel.component.html',
  styleUrl: './study-access-panel.component.scss'
})
export class StudyAccessPanelComponent {
  studyAccessService = inject(StudyAccessService);

  enable(): void {
    this.studyAccessService.enableAccess();
  }

  revoke(): void {
    this.studyAccessService.revokeAccess();
  }
}
