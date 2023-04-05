import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { primeFeature } from '@core/store/prime';
import { EffectsModule } from '@ngrx/effects';
import { effects as primeEffects } from '@core/store/prime';

@NgModule({
  imports: [
    StoreModule.forFeature(primeFeature),
    EffectsModule.forFeature(primeEffects),
  ],
})
export class CoreModule {}
