import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() multiple: boolean = false;
  selectedValues: string[] = [];
}
