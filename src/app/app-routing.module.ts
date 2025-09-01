import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',  // ✅ Agregar ruta de registro
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)

  },
  {
    path: 'profiles',  // ✅ Agregar ruta de registro
    loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesPageModule)

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [provideHttpClient()],
  exports: [RouterModule]
})
export class AppRoutingModule {}