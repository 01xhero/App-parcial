import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilesPageRoutingModule } from './profiles-routing.module';
import { ProfilePage } from './profiles.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilesPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfilePage]
})
export class ProfilesPageModule {}
