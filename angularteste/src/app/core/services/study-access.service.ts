import { Injectable, signal } from '@angular/core';

/**
 * Serviço de acesso para demonstração de Guards.
 * Mantém uma flag local de permissão que pode ser ativada na tela de estudo.
 */
@Injectable({
  providedIn: 'root'
})
export class StudyAccessService {
  // Signal publico para a UI reagir ao estado do acesso em tempo real.
  readonly accessEnabled = signal(false);

  enableAccess(): void {
    this.accessEnabled.set(true);
  }

  revokeAccess(): void {
    this.accessEnabled.set(false);
  }

  hasAccess(): boolean {
    return this.accessEnabled();
  }
}
