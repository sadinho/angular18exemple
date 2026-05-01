import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: {
    name: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Singleton via DI: uma instância única para requisições HTTP da aplicação.
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  /**
   * Responsabilidade única: encapsular acesso à API pública.
   * A camada de UI nunca monta URLs diretamente.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  /**
   * Busca um usuário específico pelo ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${id}`);
  }

  /**
   * Busca lista de posts da API pública
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`);
  }

  /**
   * Busca posts de um usuário específico
   */
  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts?userId=${userId}`);
  }

  /**
   * Busca um post específico
   */
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`);
  }
}
