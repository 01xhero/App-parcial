import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'user'; // clave para localStorage

  constructor(
    private storageProvider: StorageProvider,
    private incriptador: Incriptador
  ) {}

  crearUsuario(user: Iuser) {
    // Encriptar solo aquí
    const userToSave = { ...user, password: this.incriptador.hash(user.password) };
    this.storageProvider.set(this.storageKey, userToSave);
    console.log('Usuario guardado:', userToSave);
  }

  obtenerUsuario(): Iuser | null {
    const userData = this.storageProvider.get<Iuser>(this.storageKey);
    if (!userData) {
      console.log('No hay usuario registrado.');
      return null;
    }
    return userData;
  }

  login(email: string, password: string): boolean {
    const user = this.obtenerUsuario();
    if (!user) return false;

    return user.email === email && this.incriptador.compare(password, user.password);
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
