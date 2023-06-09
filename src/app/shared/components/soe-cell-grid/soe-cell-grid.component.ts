import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoeCellComponent } from '../soe-cell/soe-cell.component';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
      *ngFor="let cell of displayedCells; let i = index; trackBy: trackFn"
      [value]="cell.value"
      [eliminated]="cell.eliminated ?? false"
      [active]="cell.active ?? false"
      (click)="
        !cell.eliminated && cellClicked.emit({ index: i, value: cell.value })
      "
    >
    </soe-cell>
  `,
  styleUrls: ['./soe-cell-grid.component.scss'],
  animations: [
    trigger('animateCells', [
      transition('* => *', [
        // animates cells added
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(100%)' }),
            stagger(
              30,
              animate(
                '.24s 0s ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0%)',
                })
              )
            ),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class SoeCellGridComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input()
  cells: GridCell[] = [];

  @Input()
  set index(index: number) {
    this._index = index;
  }

  get index() {
    return Math.min(this._index, Math.ceil(this.cells.length / this.maxItems));
  }

  @Output()
  /**
   * emits the index of the cell clicked
   */
  cellClicked: EventEmitter<{ index: number; value: number }> =
    new EventEmitter();

  @HostBinding('@animateCells')
  get animateCells() {
    return this.displayedCells.length * (this.index + 1);
  }

  _index: number = 0;
  maxItems: number = 0;
  displayedCells: GridCell[] = [];
  $destroyed: Subject<void> = new Subject();

  trackFn: TrackByFunction<GridCell> = (index, cell) => cell.value;
  pageSizeChange = fromEvent(window, 'resize')
    .pipe(takeUntil(this.$destroyed))
    .subscribe(() => {
      this.calculateItems();
      this.selectPage();
    });

  calculateItems() {
    const columns = Math.max(
      1,
      Math.floor(
        (this.elementRef.nativeElement as HTMLElement).offsetWidth / 224
      )
    );

    const rows = Math.max(
      1,
      Math.floor(
        (this.elementRef.nativeElement as HTMLElement).offsetHeight / 63
      )
    );

    this.maxItems = columns * rows;
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
  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }
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
