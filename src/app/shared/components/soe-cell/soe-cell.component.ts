import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'soe-cell',
  standalone: true,
  imports: [CommonModule, MatRippleModule, MatTooltipModule],
  template: `
    <div
      matRipple
      [matRippleDisabled]="eliminated"
      matTooltip="{{ value | number }}"
    >
      {{ value | number }}
    </div>
  `,
  styleUrls: ['./soe-cell.component.scss'],
})
export class SoeCellComponent {
  @Input()
  value!: number;

  @HostBinding('class')
  classList = 'mat-body';

  @HostBinding('class.eliminated')
  @Input()
  eliminated: boolean = false;

  @HostBinding('class.active')
  @Input()
  active: boolean = false;
}
