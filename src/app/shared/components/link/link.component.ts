import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: false,
})
export class LinkComponent {
  @Input() href: string = '';

  constructor(private router: Router) {}

  navigate() {
    if (this.href) this.router.navigate([this.href]);
  }
}
