import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() url: string = '';

  // Nuevas propiedades para select
  @Input() multiple: boolean = false;
  @Input() selectedValues: string[] = [];
  @Input() options: { value: string; label: string }[] = [];

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async openInBrowser() {
    if (this.url) await Browser.open({ url: this.url });
  }

  onChange(event: any) {
    this.selectedValues = event.detail.value;
  }
}
