import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../../../services/api.service';

@Component({
  selector: 'app-posts-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.scss'
})
export class PostsTableComponent {
  // O container passa os dados prontos; esta peça só apresenta a tabela.
  posts = input<Post[]>([]);
  total = input<number>(0);
}
