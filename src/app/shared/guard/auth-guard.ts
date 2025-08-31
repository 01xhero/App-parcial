import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const loggedIn = this.userService.isLoggedIn();
    console.log('AuthGuard - usuario logueado:', loggedIn);
    if (!loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
