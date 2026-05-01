import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Teste da API de usuários: valida o endpoint e o mapeamento tipado da resposta.
  it('should fetch users from JSONPlaceholder', () => {
    const mockUsers = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' }
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');
    request.flush(mockUsers);
  });

  // Teste da API de posts filtrados por usuário: valida query string e retorno.
  it('should fetch posts for a specific user', () => {
    const mockPosts = [
      { userId: 3, id: 11, title: 'Sample post', body: 'Sample body' }
    ];

    service.getPostsByUserId(3).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts?userId=3');
    expect(request.request.method).toBe('GET');
    request.flush(mockPosts);
  });

  // Teste do endpoint individual: útil para consolidar a ideia de recurso por ID.
  it('should fetch a single post by id', () => {
    const mockPost = { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' };

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockPost);
  });
});
