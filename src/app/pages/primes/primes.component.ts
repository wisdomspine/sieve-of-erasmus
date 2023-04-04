import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { inputForm } from '@core/forms';
import { StepDialogComponent } from '../../dialogs/step-dialog/step-dialog.component';
import { GridCell } from '../../shared';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss'],
})
export class PrimesComponent implements AfterViewInit {
  cells: GridCell[] = new Array(10000).fill({
    value: 24,
  });
  form = inputForm();

  constructor(public readonly dialog: MatDialog) {}
  ngAfterViewInit(): void {
    return;
    this.dialog.open(StepDialogComponent, {
      width: 'calc(100vw - 128px)',
      height: 'calc(100vh - 128px)',
      minWidth: 'calc(100vw - 128px)',
      panelClass: ['soe-dialog-border-radius-8'],
      disableClose: true,
    });
  }
}
