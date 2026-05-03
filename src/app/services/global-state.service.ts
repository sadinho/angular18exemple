import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, User, Post } from './api.service';

export interface GlobalState {
  users: User[];
  posts: Post[];
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: GlobalState = {
  users: [],
  posts: [],
  selectedUserId: null,
  loading: false,
  error: null
};

/**
 * Facade (GoF): esconde os detalhes de API + estado interno atrás de uma interface simples.
 * Observer (GoF): expõe state$ para que a UI reaja a mudanças sem acoplamento direto.
 * Singleton (GoF): providedIn: 'root' faz uma única instância existir na aplicação.
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private apiService = inject(ApiService);
  // BehaviorSubject mantém o estado atual e notifica observadores quando muda.
  private stateSubject = new BehaviorSubject<GlobalState>(INITIAL_STATE);
  
  public state$: Observable<GlobalState> = this.stateSubject.asObservable();

  /**
   * Retorna o estado atual sem necessidade de subscription
   */
  getState(): GlobalState {
    return this.stateSubject.value;
  }

  /**
   * Resolvedores usam estes setters para aquecer o estado antes da rota abrir.
   */
  setUsers(users: User[]): void {
    this.updateState({ users });
  }

  setPosts(posts: Post[]): void {
    this.updateState({ posts });
  }

  setSelectedUserId(selectedUserId: number | null): void {
    this.updateState({ selectedUserId });
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  /**
    * Carrega a lista de usuários do servidor.
    * A página não fala com a API diretamente; ela chama a Facade.
   */
  loadUsers(): void {
    this.updateState({ loading: true, error: null });
    
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.updateState({ users, loading: false });
      },
      error: (error) => {
        this.updateState({ 
          loading: false, 
          error: 'Erro ao carregar usuários' 
        });
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  /**
    * Carrega a lista de posts do servidor.
    * O estado é atualizado em uma única fonte da verdade.
   */
  loadPosts(): void {
    this.updateState({ loading: true, error: null });
    
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.updateState({ posts, loading: false });
      },
      error: (error) => {
        this.updateState({ 
          loading: false, 
          error: 'Erro ao carregar posts' 
        });
        console.error('Erro ao carregar posts:', error);
      }
    });
  }

  /**
    * Carrega posts de um usuário específico.
    * Mudamos o filtro e os dados juntos para manter consistência.
   */
  loadPostsByUserId(userId: number): void {
    this.updateState({ loading: true, error: null, selectedUserId: userId });
    
    this.apiService.getPostsByUserId(userId).subscribe({
      next: (posts) => {
        this.updateState({ posts, loading: false });
      },
      error: (error) => {
        this.updateState({ 
          loading: false, 
          error: 'Erro ao carregar posts do usuário' 
        });
        console.error('Erro:', error);
      }
    });
  }

  /**
    * Seleciona um usuário e notifica a UI via Observer.
   */
  selectUser(userId: number): void {
    this.updateState({ selectedUserId: userId });
  }

  /**
   * Reseta o estado para valores iniciais
   */
  reset(): void {
    this.stateSubject.next(INITIAL_STATE);
  }

  /**
   * Atualiza parcialmente o estado
   */
  private updateState(partial: Partial<GlobalState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...partial });
  }
}
