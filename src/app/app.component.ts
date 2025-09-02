import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  categorySelected$ = new Subject<string>();

  constructor(private menuCtrl: MenuController) {}

  selectCategory(category: string) {
    this.categorySelected$.next(category);
    this.menuCtrl.close(); // 🔹 cerramos el menú al seleccionar
  }
}
