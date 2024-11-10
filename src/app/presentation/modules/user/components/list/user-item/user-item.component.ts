import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent { }
