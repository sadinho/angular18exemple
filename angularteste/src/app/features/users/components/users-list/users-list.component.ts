import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '../../../../services/api.service';

@Component({
  selector: 'app-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  // Componente puro de apresentação: recebe dados e emite ações ao container.
  users = input<User[]>([]);
  total = input<number>(0);
  selectedUserId = input<number | null>(null);

  selectUser = output<number>();
  showUserPosts = output<number>();

  isSelected(userId: number): boolean {
    return this.selectedUserId() === userId;
  }
}
