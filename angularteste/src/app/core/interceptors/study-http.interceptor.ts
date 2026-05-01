import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

/**
 * Interceptor (GoF-ish middleware): intercepta todas as requisições HTTP.
 * Uso didático: adiciona um header de estudo, mede tempo e registra requisições.
 */
export const studyHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();
  const clonedRequest = req.clone({
    setHeaders: {
      'X-Study-App': 'Angular-Study-App'
    }
  });

  console.log('[HTTP] ->', clonedRequest.method, clonedRequest.urlWithParams);

  return next(clonedRequest).pipe(
    tap({
      next: (event) => {
        if (event.type === 4) {
          console.log('[HTTP] <- response', clonedRequest.urlWithParams);
        }
      },
      error: (error) => {
        console.error('[HTTP] error', clonedRequest.urlWithParams, error);
      }
    }),
    finalize(() => {
      const duration = Math.round(performance.now() - startedAt);
      console.log('[HTTP] completed in', duration, 'ms:', clonedRequest.urlWithParams);
    })
  );
};
