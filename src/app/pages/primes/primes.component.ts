import { Component, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { inputForm } from '@core/forms';
import { StepDialogComponent } from '@app/dialogs';
import { GridCell } from '@soe';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  take,
  takeUntil,
} from 'rxjs';
import { Store, createSelector } from '@ngrx/store';
import {
  PrimeActions,
  selectCurrentPreview,
  selectMax,
  selectMin,
  selectPrimeNumbers,
} from '@core/store/prime';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss'],
})
export class PrimesComponent implements OnDestroy {
  readonly store: Store = inject(Store);
  readonly dialog: MatDialog = inject(MatDialog);
  private destroy$: Subject<void> = new Subject();
  form = inputForm();

  cells$: Observable<GridCell[]> = this.store
    .select(
      createSelector(selectPrimeNumbers, (primes) =>
        primes.map((num) => ({
          value: num,
        }))
      )
    )
    .pipe(takeUntil(this.destroy$));

  totalPrimes$: Observable<number> = this.store.select(selectPrimeNumbers).pipe(
    takeUntil(this.destroy$),
    map((numbers) => numbers.length)
  );

  initializeForm$ = combineLatest([
    this.store.select(selectMin),
    this.store.select(selectMax),
  ])
    // take the initial form value, in order to reflect the patch value
    .pipe(take(1))
    .subscribe(([min, max]) => {
      this.form.patchValue({
        min,
        max,
      });
    });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculate() {
    this.store.dispatch(
      PrimeActions.calculate({
        min: this.form.value.min as number,
        max: this.form.value.max as number,
      })
    );
  }

  preview(prime: number) {
    this.store.dispatch(PrimeActions.viewPrime({ prime }));
    this.dialog.open(StepDialogComponent, {
      width: 'calc(100vw - 128px)',
      height: 'calc(100vh - 128px)',
      minWidth: 'calc(100vw - 128px)',
      panelClass: ['soe-dialog-border-radius-8'],
      disableClose: true,
    });
  }
}
