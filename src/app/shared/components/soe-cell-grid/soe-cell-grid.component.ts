import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoeCellComponent } from '../soe-cell/soe-cell.component';

export type GridCell = {
  value: number;
  eliminated?: boolean;
  active?: boolean;
};

@Component({
  selector: 'soe-cell-grid',
  standalone: true,
  imports: [CommonModule, SoeCellComponent],
  template: `
    <soe-cell
      *ngFor="let cell of displayedCells; let i = index"
      [value]="cell.value"
      [eliminated]="cell.eliminated ?? false"
      [active]="cell.active ?? false"
      (click)="!cell.eliminated && cellClicked.emit(i)"
    >
    </soe-cell>
  `,
  styleUrls: ['./soe-cell-grid.component.scss'],
})
export class SoeCellGridComponent implements AfterViewInit, OnChanges {
  @Input()
  cells: GridCell[] = [];

  @Input()
  index: number = 0;

  @Output()
  /**
   * emits the index of the cell clicked
   */
  cellClicked: EventEmitter<number> = new EventEmitter();

  maxItems: number = 0;
  displayedCells: GridCell[] = [];

  @HostListener('resize')
  pageSizeChange() {
    this.calculateItems();
    this.selectPage();
  }

  calculateItems() {
    const width = Math.floor(
      (this.elementRef.nativeElement as HTMLElement).offsetWidth / 224
    );

    const height = Math.floor(
      (this.elementRef.nativeElement as HTMLElement).offsetHeight / 63
    );

    this.maxItems = width * height;
  }

  get hasNextPage() {
    return (this.index + 1) * this.maxItems < this.cells.length;
  }

  get hasPrevPage() {
    return this.index > 0;
  }

  selectPage() {
    this.displayedCells = this.cells.slice(
      this.index * this.maxItems,
      (this.index + 1) * this.maxItems
    );
  }

  next() {
    if (!this.hasNextPage) return;
    this.index = this.index + 1;
    this.selectPage();
  }

  prev() {
    if (!this.hasPrevPage) return;
    this.index = this.index - 1;
    this.selectPage();
  }

  constructor(public readonly elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (
        changes['index']?.currentValue != changes['index']?.previousValue ||
        changes['cells']?.currentValue != changes['cells']?.previousValue
      ) {
        this.selectPage();
      }
    }, 0);
  }
  ngAfterViewInit(): void {
    this.calculateItems();
    setTimeout(() => {
      this.selectPage();
    }, 0);
  }
}
