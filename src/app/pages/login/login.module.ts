import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Agrega ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

// Importa tu SharedModule donde están tus componentes
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ necesario para [formGroup]
    IonicModule,
    LoginPageRoutingModule,
    SharedModule // ✅ importa aquí tus componentes como app-header
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
