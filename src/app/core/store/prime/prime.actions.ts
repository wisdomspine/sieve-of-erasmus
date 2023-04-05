import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PrimeActions = createActionGroup({
  source: '[Prime Action]',
  events: {
    calculate: props<{ min: number; max: number }>(),
    'view Prime': props<{ prime: number | null }>(),
    'view Next': emptyProps(),
    'view Prev': emptyProps(),
    done: emptyProps(),
    'add Step': props<{
      prime: number;
      eliminated: { [key: number]: boolean };
    }>(),
  },
});
