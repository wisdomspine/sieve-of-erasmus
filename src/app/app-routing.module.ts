import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepDialogComponent } from './dialogs/step-dialog/step-dialog.component';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { PrimesComponent } from './pages/primes/primes.component';

const routes: Routes = [
  {
    path: '',
    component: InputPageComponent,
    title: 'Sieve Of Erasmus',
  },
  {
    path: 'primes',
    component: PrimesComponent,
    title: 'Primes between 2 and 8',
  },
  {
    path: 'step',
    component: StepDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
