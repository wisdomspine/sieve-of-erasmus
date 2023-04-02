import { Component } from '@angular/core';
import { IconService } from '@core/services';

@Component({
  selector: 'app-root',
  template: ` <div><router-outlet></router-outlet></div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sieve-of-erasmus';
  constructor(
    /**
     * This provided is imported here to ensure it's loaded early
     */
    iconService: IconService
  ) {}
}
