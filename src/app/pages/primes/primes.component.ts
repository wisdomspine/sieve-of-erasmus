import { Component } from '@angular/core';
import { inputForm } from '@core/forms';
import { GridCell } from '../../shared';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss'],
})
export class PrimesComponent {
  cells: GridCell[] = new Array(10000).fill({
    value: 24,
  });
  form = inputForm();
}
