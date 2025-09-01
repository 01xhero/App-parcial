import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profiles.page'; // ⚠ usar ProfilePage, no ProfilesPage
import { AuthGuard } from 'src/app/shared/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage, // ⚠ también aquí
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesPageRoutingModule {}
