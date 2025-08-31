import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkComponent } from './components/link/link.component';
import { SelectComponent } from './components/select/select.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    SelectComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    SelectComponent,
    CardComponent
  ]
})
export class SharedModule {}
