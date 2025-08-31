import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  template: `
    <ion-button [type]="type" [disabled]="disabled"><ng-content></ng-content></ion-button>
  `
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
}
