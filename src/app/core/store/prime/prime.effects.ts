import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { sieveOfEratosthenes } from '@core/functions';
import { concat, map, of, skip, switchMap, takeUntil } from 'rxjs';
import { PrimeActions } from './prime.actions';

export const calculatePrimeNumbersEffect = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(PrimeActions.calculate),
      switchMap(({ min, max }) => {
        return concat(
          sieveOfEratosthenes(min, max).pipe(
            takeUntil(action$.pipe(ofType(PrimeActions.calculate), skip(1))),
            map((result) => {
              return PrimeActions.addStep({
                prime: result.prime,
                eliminated: result.eliminated,
              });
            })
          ),
          of(PrimeActions.done())
        );
      })
    );
  },
  {
    functional: true,
  }
);
