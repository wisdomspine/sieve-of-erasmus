import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPrimeState } from '@core/store/prime';
import { map } from 'rxjs';

export const primesTitleResolver: ResolveFn<string> = () => {
  return inject(Store)
    .select(selectPrimeState)
    .pipe(
      map((state) => {
        if (state.min != null && state.max != null)
          return `Prime numbers between ${state.min} and ${state.max}`;
        else if (state.min != null)
          return `Prime numbers greater or equal to ${state.min}`;
        else if (state.max != null)
          return `Prime numbers less than or equal to ${state.max}`;
        else return 'Prime numbers';
      })
    );
};
