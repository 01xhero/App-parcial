import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'user';      // donde se guarda el usuario
  private sessionKey = 'isLogged';  // controla si hay sesión activa

  constructor(
    private storageProvider: StorageProvider,
    private incriptador: Incriptador
  ) {
    // Opcional: limpiar sesión al iniciar la app
    // this.storageProvider.remove(this.sessionKey);
  }

  crearUsuario(user: Iuser) {
    const userToSave = { ...user, password: this.incriptador.hash(user.password) };
    this.storageProvider.set(this.storageKey, userToSave);
    console.log('Usuario guardado:', userToSave);
  }

  obtenerUsuario(): Iuser | null {
    return this.storageProvider.get<Iuser>(this.storageKey);
  }

  login(email: string, password: string): boolean {
    const user = this.obtenerUsuario();
    if (!user) return false;

    const isValid = user.email === email && this.incriptador.compare(password, user.password);
    if (isValid) {
      this.storageProvider.set(this.sessionKey, true); // activa sesión
    }
    return isValid;
  }

  logout() {
    this.storageProvider.remove(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return this.storageProvider.get<boolean>(this.sessionKey) === true;
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
