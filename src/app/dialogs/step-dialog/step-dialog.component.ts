import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridCell, SoeCellGridComponent, SoePageArrowComponent } from '@soe';

@Component({
  selector: 'app-step-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SoePageArrowComponent,
    SoeCellGridComponent,
  ],
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss'],
})
export class StepDialogComponent {
  cells: GridCell[] = new Array(10000).fill({
    value: 24,
  });
  constructor(public readonly dialogRef: MatDialogRef<StepDialogComponent>) {}
}
