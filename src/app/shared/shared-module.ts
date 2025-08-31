import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageProvider } from './provide/storage-provider';



@NgModule({
  declarations: [InputComponent, ButtonComponent],
  providers: [StorageProvider],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,// para formularios
    ReactiveFormsModule// para formularios
  ],
  exports:[InputComponent, ButtonComponent],
})
export class SharedModule { }
