import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageProvider: StorageProvider,
    private incriptador: Incriptador
  ) {}

  // Crear usuario
  crearUsuario(user: Iuser) {
    // Encriptar la contraseña usando Incriptador.hash()
    user.password = this.incriptador.hash(user.password);

    // Guardar en localStorage
    this.storageProvider.set('user', JSON.stringify(user));
  }

obtenerUsuario(): Iuser | null {
  const userData = this.storageProvider.get('user');

  // Verificar que userData sea un string
  if (typeof userData !== 'string' || userData.trim() === '') {
    return null;
  }

  try {
    const user: Iuser = JSON.parse(userData);
    return user;
  } catch (error) {
    console.error('Error parseando usuario:', error);
    return null;
  }
}



  // Verificar login
  login(email: string, password: string): boolean {
    const user = this.obtenerUsuario();
    if (!user) return false;
    return user.email === email && this.incriptador.compare(password, user.password);
  }

  // Generar un ID (simple)
  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

// Interface del usuario
export interface Iuser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}
