import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list-items',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemsComponent { }
