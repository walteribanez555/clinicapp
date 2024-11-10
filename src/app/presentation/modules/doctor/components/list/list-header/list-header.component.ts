import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHeaderComponent {
  @Output() onAddEvent = new EventEmitter();


  onAddToggle() {
    this.onAddEvent.emit();
  }


 }
