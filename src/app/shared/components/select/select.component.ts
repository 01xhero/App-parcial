import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: false,
  template: `
    <ion-item>
      <ion-label>Selecciona</ion-label>
      <ion-select [multiple]="multiple" [value]="value" (ionChange)="onChangeSelect($event)">
        <ion-select-option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</ion-select-option>
      </ion-select>
    </ion-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Input() multiple: boolean = false;
  value: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChangeSelect(event: any) {
    this.value = event.detail.value;
    this.onChange(this.value);
  }
}
