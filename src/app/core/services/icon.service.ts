import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
const icons: string[] = ['chevron-left', 'chevron-right', 'xmark'];

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly domSanitizer: DomSanitizer
  ) {
    icons.forEach((icon) => {
      iconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
      );
    });
  }
}
