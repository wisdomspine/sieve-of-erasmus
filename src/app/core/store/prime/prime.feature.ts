import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PrimeState } from './prime.state';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { PrimeActions } from './prime.actions';
const initialState: PrimeState = {
  currentPreview: null,
  isCalculating: false,
  max: null,
  min: null,
  primeNumbers: [],
  primeSteps: {},
};

export const primeFeature = createFeature({
  name: 'prime',
  reducer: createReducer(
    initialState,
    on(PrimeActions.calculate, (state, { min, max }) => {
      if (state.min == min && state.max == max) return state;
      return {
        ...state,
        min,
        max,
        primeNumbers: [],
        primeSteps: {},
        currentPreview: null,
        isCalculating: true,
      };
    }),
    on(PrimeActions.viewPrime, (state, { prime }) => {
      if (prime == null || !(prime in state.primeSteps))
        return { ...state, currentPreview: null };
      return { ...state, currentPreview: prime };
    }),
    on(PrimeActions.viewNext, (state) => {
      const currentPreview = state.currentPreview;
      const currentPreviewIndex =
        currentPreview == null
          ? -1
          : state.primeNumbers.indexOf(currentPreview);

      if (currentPreview == null || currentPreviewIndex == -1) {
        return { ...state, currentPreview: null };
      }
      return {
        ...state,
        currentPreview:
          currentPreviewIndex < state.primeNumbers.length - 1
            ? state.primeNumbers[currentPreviewIndex + 1]
            : currentPreview,
      };
    }),
    on(PrimeActions.viewPrev, (state) => {
      const currentPreview = state.currentPreview;
      const currentPreviewIndex =
        currentPreview == null
          ? -1
          : state.primeNumbers.indexOf(currentPreview);

      if (currentPreview == null || currentPreviewIndex == -1)
        return { ...state, currentPreview: null };

      return {
        ...state,
        currentPreview:
          currentPreviewIndex > 0
            ? state.primeNumbers[currentPreviewIndex - 1]
            : currentPreview,
      };
    }),
    on(PrimeActions.done, (state) => {
      return {
        ...state,
        isCalculating: false,
      };
    }),
    on(PrimeActions.addStep, (state, { prime, eliminated }) => {
      return {
        ...state,
        primeNumbers: [...state.primeNumbers, prime],
        primeSteps: {
          ...state.primeSteps,
          [prime]: eliminated,
        },
      };
    })
  ),
  extraSelectors: ({
    selectMin,
    selectMax,
    selectCurrentPreview,
    selectPrimeNumbers,
    selectPrimeSteps,
  }) => ({
    selectHasMinAndMax: createSelector(selectMin, selectMax, (min, max) => {
      if (min == null || max == null) return false;
      return true;
    }),
    canViewPrev: createSelector(
      selectCurrentPreview,
      selectPrimeNumbers,
      (current, numbers) => {
        if (current == null) return false;
        const index = numbers.indexOf(current);
        return index > 0;
      }
    ),
    canViewNext: createSelector(
      selectCurrentPreview,
      selectPrimeNumbers,
      (current, numbers) => {
        if (current == null) return false;
        const index = numbers.indexOf(current);
        return index < numbers.length - 1;
      }
    ),
    selectCurrentPreviewSteps: createSelector(
      selectCurrentPreview,
      selectPrimeSteps,
      (current, steps) => {
        return current == null ? null : steps[current];
      }
    ),
  }),
});
export const {
  name,
  reducer,
  selectCurrentPreview,
  selectIsCalculating,
  selectMax,
  selectMin,
  selectPrimeNumbers,
  selectPrimeState,
  selectPrimeSteps,
  selectHasMinAndMax,
  canViewNext,
  canViewPrev,
  selectCurrentPreviewSteps,
} = primeFeature;
