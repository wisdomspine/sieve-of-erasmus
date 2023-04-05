import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { inputForm } from '@core/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { PrimeActions, selectHasMinAndMax } from '@core/store/prime';
@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject();
  readonly form = inputForm();
  readonly store: Store = inject(Store);
  readonly router: Router = inject(Router);

  constructor() {
    this.store
      .select(selectHasMinAndMax)
      .pipe(takeUntil(this.destroy$))
      .subscribe((has) => {
        if (has) {
          this.router.navigateByUrl('/primes');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.form.valid &&
      this.store.dispatch(
        PrimeActions.calculate({
          min: this.form.value.min as number,
          max: this.form.value.max as number,
        })
      );
  }
}
