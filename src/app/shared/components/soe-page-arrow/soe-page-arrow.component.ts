import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'soe-page-arrow',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  template: `
    <div matRipple [matRippleDisabled]="disabled">
      <mat-icon svgIcon="chevron-left" *ngIf="left"></mat-icon>
      <mat-icon svgIcon="chevron-right" *ngIf="right"></mat-icon>
    </div>
  `,
  styleUrls: ['./soe-page-arrow.component.scss'],
})
export class SoePageArrowComponent {
  @Input()
  position!: 'left' | 'right';

  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;

  @HostBinding('class.left')
  get left() {
    return this.position == 'left';
  }

  @HostBinding('class.right')
  get right() {
    return this.position == 'right';
  }

  @HostBinding('class')
  classNames = 'soe-elevation-z6';
}
