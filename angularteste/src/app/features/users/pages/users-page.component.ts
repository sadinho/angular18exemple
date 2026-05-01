import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../../services/global-state.service';
import { PageNavComponent, PageNavLink } from '../../../shared/components/page-nav/page-nav.component';
import { UsersFilterComponent } from '../components/users-filter/users-filter.component';
import { UsersListComponent } from '../components/users-list/users-list.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UsersFilterComponent, UsersListComponent, PageNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
  private router = inject(Router);
  private globalState = inject(GlobalStateService);

  // AsyncPipe aplica o Observer pattern na leitura do estado global.
  state$ = this.globalState.state$;
  // Signal local para busca desta tela.
  searchTerm = signal('');
  navLinks: PageNavLink[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Posts', route: '/posts' }
  ];

  // O filtro é derivado do estado global, sem duplicar dados em memória.
  filteredUsers = computed(() => {
    const state = this.globalState.getState();
    const search = this.searchTerm().toLowerCase();

    if (!search) {
      return state.users;
    }

    return state.users.filter((user) =>
      user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    // Os dados entram via resolver; o botao abaixo dispara recarregamento manual.
  }

  reloadUsers(): void {
    this.globalState.loadUsers();
  }

  onSearchChanged(value: string): void {
    this.searchTerm.set(value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
  }

  selectUser(userId: number): void {
    this.globalState.selectUser(userId);
  }

  loadUserPosts(userId: number): void {
    this.globalState.loadPostsByUserId(userId);
    this.router.navigate(['posts']);
  }
}
