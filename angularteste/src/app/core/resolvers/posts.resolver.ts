import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, Post } from '../../services/api.service';
import { GlobalStateService } from '../../services/global-state.service';

/**
 * Resolver: carrega os posts antes da ativacao da rota.
 * Mantem a tela pronta e mostra o fluxo de prefetch para estudo.
 */
export const postsResolver: ResolveFn<Post[]> = async () => {
  const apiService = inject(ApiService);
  const stateService = inject(GlobalStateService);
  const posts = await firstValueFrom(apiService.getPosts());
  stateService.setPosts(posts);
  return posts;
};
