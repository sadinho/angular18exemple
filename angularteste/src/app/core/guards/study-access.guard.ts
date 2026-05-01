import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudyAccessService } from '../services/study-access.service';

/**
 * Guard (GoF Chain of Responsibility): decide se a rota pode ser ativada.
 * Aqui ele protege a rota de usuarios para demonstrar bloqueio/redirect.
 */
export const studyAccessGuard: CanActivateFn = () => {
  const accessService = inject(StudyAccessService);
  const router = inject(Router);

  if (accessService.hasAccess()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
