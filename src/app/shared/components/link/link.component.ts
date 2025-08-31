import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: false,
  template: `<a (click)="navigate()"><ng-content></ng-content></a>`
})
export class LinkComponent {
  @Input() href: string = '/';

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.href]);
  }
}
