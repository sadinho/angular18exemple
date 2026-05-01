import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, User } from '../../services/api.service';
import { GlobalStateService } from '../../services/global-state.service';

/**
 * Resolver: pre-carrega usuarios antes da rota abrir.
 * E util para evitar loading redundante e mostrar data prefetch.
 */
export const usersResolver: ResolveFn<User[]> = async () => {
  const apiService = inject(ApiService);
  const stateService = inject(GlobalStateService);
  const users = await firstValueFrom(apiService.getUsers());
  stateService.setUsers(users);
  return users;
};
