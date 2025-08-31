import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';     // ahora es un array de usuarios
  private sessionKey = 'currentUser'; // guarda el email del usuario logueado

  constructor(
    private storageProvider: StorageProvider,
    private incriptador: Incriptador
  ) {}

  crearUsuario(user: Iuser): boolean {
    const users = this.obtenerUsuarios() || [];

    // Verificar si ya existe el email
    if (users.some(u => u.email === user.email)) {
      console.error('El usuario ya existe');
      return false;
    }

    const userToSave = { ...user, password: this.incriptador.hash(user.password) };
    users.push(userToSave);
    this.storageProvider.set(this.storageKey, users);
    console.log('Usuario registrado:', userToSave);
    return true;
  }

  obtenerUsuarios(): Iuser[] {
    return this.storageProvider.get<Iuser[]>(this.storageKey) || [];
  }

  login(email: string, password: string): boolean {
    const users = this.obtenerUsuarios();
    const user = users.find(u => u.email === email);
    if (!user) return false;

    const isValid = this.incriptador.compare(password, user.password);
    if (isValid) {
      this.storageProvider.set(this.sessionKey, email); // guardamos el usuario logueado
    }
    return isValid;
  }

  logout() {
    this.storageProvider.remove(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return !!this.storageProvider.get<string>(this.sessionKey);
  }

  getCurrentUser(): Iuser | null {
    const email = this.storageProvider.get<string>(this.sessionKey);
    if (!email) return null;
    return this.obtenerUsuarios().find(u => u.email === email) || null;
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

export interface Iuser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}
