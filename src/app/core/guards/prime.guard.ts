import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHasMinAndMax } from '@core/store/prime';
import { map } from 'rxjs';
import { Router } from '@angular/router';

export const hasMinAndMaxGuard = () => {
  const router = inject(Router);
  return inject(Store)
    .select(selectHasMinAndMax)
    .pipe(map((x) => (x ? x : router.parseUrl('/'))));
};

export const hasNotMinOrMaxGuard = () => {
  const router = inject(Router);
  return inject(Store)
    .select(selectHasMinAndMax)
    .pipe(map((x) => !x))
    .pipe(map((x) => (x ? x : router.parseUrl('/primes'))));
};
