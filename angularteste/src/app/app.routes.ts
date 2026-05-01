import { Routes } from '@angular/router';
import { studyAccessGuard } from './core/guards/study-access.guard';
import { postsResolver } from './core/resolvers/posts.resolver';
import { usersResolver } from './core/resolvers/users.resolver';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page.component';
import { FormsLabPageComponent } from './features/forms-lab/pages/forms-lab-page.component';
import { PostsPageComponent } from './features/posts/pages/posts-page.component';
import { RxjsLabPageComponent } from './features/rxjs-lab/pages/rxjs-lab-page.component';
import { UsersPageComponent } from './features/users/pages/users-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'posts',
    component: PostsPageComponent,
    resolve: {
      posts: postsResolver
    }
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [studyAccessGuard],
    resolve: {
      users: usersResolver
    }
  },
  {
    path: 'forms-lab',
    component: FormsLabPageComponent
  },
  {
    path: 'rxjs-lab',
    component: RxjsLabPageComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
