import { Component } from '@angular/core';
import { inputForm } from '@core/forms';
@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent {
  readonly form = inputForm();
}
