import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService, Post, User } from './api.service';
import { GlobalStateService } from './global-state.service';

describe('GlobalStateService', () => {
  let service: GlobalStateService;

  const mockUsers: User[] = [
    { id: 1, name: 'Ana', email: 'ana@example.com' },
    { id: 2, name: 'Bruno', email: 'bruno@example.com' }
  ];

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Primeiro post', body: 'Conteudo do post' }
  ];

  const apiServiceMock: Pick<ApiService, 'getUsers' | 'getPosts' | 'getPostsByUserId'> = {
    getUsers: () => of(mockUsers),
    getPosts: () => of(mockPosts),
    getPostsByUserId: () => of(mockPosts)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalStateService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(GlobalStateService);
  });

  // Estado inicial: ajuda a entender a única fonte da verdade antes de qualquer ação.
  it('should start with the initial state', () => {
    expect(service.getState()).toEqual({
      users: [],
      posts: [],
      selectedUserId: null,
      loading: false,
      error: null
    });
  });

  // Carregamento de usuários: mostra a Facade buscando dados e atualizando o estado global.
  it('should load users into the global state', () => {
    service.loadUsers();

    expect(service.getState().users).toEqual(mockUsers);
    expect(service.getState().loading).toBeFalsy();
    expect(service.getState().error).toBeNull();
  });

  // Carregamento filtrado por usuário: útil para estudar consistência entre filtro e lista.
  it('should load posts by user id and store the selected user', () => {
    service.loadPostsByUserId(1);

    expect(service.getState().posts).toEqual(mockPosts);
    expect(service.getState().selectedUserId).toBe(1);
    expect(service.getState().loading).toBeFalsy();
  });

  // Seleção local do usuário: o estado muda sem precisar chamar a API.
  it('should update the selected user id', () => {
    service.selectUser(2);

    expect(service.getState().selectedUserId).toBe(2);
  });
});
