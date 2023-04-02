import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'soe-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `<mat-toolbar color="accent"> <p>Made with ❤️</p> </mat-toolbar> `,
  styleUrls: ['./soe-footer.component.scss'],
})
export class SoeFooterComponent {}
