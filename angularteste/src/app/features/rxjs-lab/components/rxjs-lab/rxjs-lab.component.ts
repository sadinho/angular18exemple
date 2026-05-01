import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, combineLatest, debounceTime, distinctUntilChanged, exhaustMap, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ApiService, Post, User } from '../../../../services/api.service';

@Component({
  selector: 'app-rxjs-lab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rxjs-lab.component.html',
  styleUrl: './rxjs-lab.component.scss'
})
export class RxjsLabComponent implements OnInit {
  private apiService = inject(ApiService);

  // switchMap: cancela buscas antigas quando o termo muda rápido.
  searchControl = new FormControl('', { nonNullable: true });
  // combineLatest: junta 2 fontes independentes para derivar o resultado final.
  userFilterControl = new FormControl('all', { nonNullable: true });
  sortControl = new FormControl('title', { nonNullable: true });
  // exhaustMap: ignora cliques extras enquanto a requisicao atual ainda nao terminou.
  private nextUserClicks = new Subject<number>();
  private nextUserClickCounter = 0;

  searchResults$!: Observable<Post[]>;
  combinedPosts$!: Observable<Post[]>;
  nextUser$!: Observable<User | null>;

  ngOnInit(): void {
    const posts$ = this.apiService.getPosts().pipe(
      catchError(() => of([] as Post[]))
    );

    this.searchResults$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        this.apiService.getPosts().pipe(
          map((posts) =>
            posts.filter((post) =>
              post.title.toLowerCase().includes(term.toLowerCase()) ||
              post.body.toLowerCase().includes(term.toLowerCase())
            )
          ),
          catchError(() => of([] as Post[]))
        )
      )
    );

    this.combinedPosts$ = combineLatest([
      posts$,
      this.userFilterControl.valueChanges.pipe(startWith(this.userFilterControl.value)),
      this.sortControl.valueChanges.pipe(startWith(this.sortControl.value))
    ]).pipe(
      map(([posts, userFilter, sortBy]) => {
        const filtered = userFilter === 'all'
          ? posts
          : posts.filter((post) => post.userId === Number(userFilter));

        return [...filtered].sort((left, right) => {
          if (sortBy === 'id') {
            return left.id - right.id;
          }
          return left.title.localeCompare(right.title);
        });
      })
    );

    this.nextUser$ = this.nextUserClicks.pipe(
      exhaustMap((clickIndex) => this.apiService.getUserById((clickIndex % 10) + 1).pipe(
        catchError(() => of(null))
      ))
    );
  }

  triggerNextUser(): void {
    this.nextUserClicks.next(++this.nextUserClickCounter);
  }
}
