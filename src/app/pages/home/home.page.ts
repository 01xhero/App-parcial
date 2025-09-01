import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, Iuser } from 'src/app/shared/service/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  currentUser: Iuser | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Asumiendo que la ruta de perfil es /profile
  }
}
