import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validator } from '@angular/forms';
import { CustomInput } from '../CustomInput.interface';

@Component({
  selector: 'app-input-time',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './input-time.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTimeComponent implements CustomInput {
  @Input()  formControl!: FormControl<any>;
  @Input()  data: any;
  @Input()  validators : Validator[] = [];

 }
