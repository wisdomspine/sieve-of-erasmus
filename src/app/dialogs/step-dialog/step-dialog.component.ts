import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridCell, SoeCellGridComponent, SoePageArrowComponent } from '@soe';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import {
  PrimeActions,
  canViewNext,
  canViewPrev,
  selectCurrentPreview,
  selectCurrentPreviewSteps,
} from '@core/store/prime';

@Component({
  selector: 'app-step-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SoePageArrowComponent,
    SoeCellGridComponent,
  ],
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss'],
})
export class StepDialogComponent implements OnDestroy {
  cells: GridCell[] = new Array(10000).fill({
    value: 24,
  });

  destroy$: Subject<void> = new Subject();
  readonly dialogRef: MatDialogRef<StepDialogComponent> = inject(
    MatDialogRef<StepDialogComponent>
  );
  readonly store: Store = inject(Store);

  currentPreview$ = this.store.select(selectCurrentPreview).pipe(
    tap((prime) => {
      if (prime == null) {
        this.dialogRef.close();
      }
    }),
    filter((prime) => prime != null)
  );

  hasPrev$ = this.store.select(canViewPrev);
  hasNext$ = this.store.select(canViewNext);
  cells$: Observable<GridCell[]> = combineLatest([
    this.store.select(selectCurrentPreviewSteps).pipe(
      map((steps) => {
        if (steps == null) return [];
        return Object.keys(steps).map((key) => ({
          value: Number.parseInt(key),
          eliminated: steps[Number.parseInt(key)],
        }));
      })
    ),
    this.currentPreview$,
  ]).pipe(
    map(([steps, current]) => {
      return steps.map((step) => ({ ...step, active: step.value == current }));
    })
  );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  next() {
    this.store.dispatch(PrimeActions.viewNext());
  }

  prev() {
    this.store.dispatch(PrimeActions.viewPrev());
  }

  close() {
    this.store.dispatch(PrimeActions.viewPrime({ prime: null }));
  }
}
