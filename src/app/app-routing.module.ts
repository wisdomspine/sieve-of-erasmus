import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputPageComponent, PrimesComponent } from '@app/pages';
import { hasMinAndMaxGuard, hasNotMinOrMaxGuard } from '@core/guards';
import { primesTitleResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: InputPageComponent,
    title: 'Sieve Of Eratosthenes',
    canActivate: [hasNotMinOrMaxGuard],
  },
  {
    path: 'primes',
    component: PrimesComponent,
    title: primesTitleResolver,
    canActivate: [hasMinAndMaxGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
