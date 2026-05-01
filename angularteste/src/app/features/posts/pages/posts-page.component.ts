import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { GlobalStateService } from '../../../services/global-state.service';
import { PageNavComponent, PageNavLink } from '../../../shared/components/page-nav/page-nav.component';
import { PostsFilterComponent } from '../components/posts-filter/posts-filter.component';
import { PostsTableComponent } from '../components/posts-table/posts-table.component';

@Component({
  selector: 'app-posts-page',
  imports: [AsyncPipe, PostsFilterComponent, PostsTableComponent, PageNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent implements OnInit {
  private globalState = inject(GlobalStateService);

  // RxJS/Observer: o template observa o estado global via async pipe.
  state$ = this.globalState.state$;
  // Signals: filtro local da tela, sem contaminar o estado global.
  searchTerm = signal('');
  navLinks: PageNavLink[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Usuarios', route: '/users' }
  ];

  // computed: filtra sem side effects e só recalcula quando o termo muda.
  filteredPosts = computed(() => {
    const state = this.globalState.getState();
    const search = this.searchTerm().toLowerCase();

    if (!search) {
      return state.posts;
    }

    return state.posts.filter((post) =>
      post.title.toLowerCase().includes(search) || post.body.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    // Os dados entram via resolver para evitar requisicao duplicada.
  }

  onSearchChanged(value: string): void {
    this.searchTerm.set(value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
  }
}
