import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SideBarComponent {
  menuItems = [
    { title: 'Inicio', link: '/home' },
    { title: 'Perfil', link: '/profile' },
    { title: 'Cerrar sesión', link: '/login' }
  ];
}
