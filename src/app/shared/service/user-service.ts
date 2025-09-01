import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';       // array de usuarios
  private sessionKey = 'currentUser'; // email del usuario logueado

  constructor(
    private storageProvider: StorageProvider,
    private incriptador: Incriptador
  ) {}

  /** Genera un ID aleatorio para el usuario */
  public generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /** Encripta la contraseña */
  public hashPassword(password: string): string {
    return this.incriptador.hash(password);
  }

  /** Crea un nuevo usuario */
  public crearUsuario(user: Iuser): boolean {
    const users = this.obtenerUsuarios() || [];

    if (users.some(u => u.email === user.email)) {
      console.error('El usuario ya existe');
      return false;
    }

    const userToSave = { ...user, password: this.hashPassword(user.password) };
    users.push(userToSave);
    this.storageProvider.set(this.storageKey, users);
    console.log('Usuario registrado:', userToSave);
    return true;
  }

  /** Obtiene todos los usuarios */
  public obtenerUsuarios(): Iuser[] {
    return this.storageProvider.get<Iuser[]>(this.storageKey) || [];
  }

  /** Login de usuario */
  public login(email: string, password: string): boolean {
    const users = this.obtenerUsuarios();
    const user = users.find(u => u.email === email);
    if (!user) return false;

    const isValid = this.incriptador.compare(password, user.password);
    if (isValid) {
      this.storageProvider.set(this.sessionKey, email);
    }
    return isValid;
  }

  /** Logout */
  public logout(): void {
    this.storageProvider.remove(this.sessionKey);
  }

  /** Comprueba si hay usuario logueado */
  public isLoggedIn(): boolean {
    return !!this.storageProvider.get<string>(this.sessionKey);
  }

  /** Devuelve el usuario actual o null */
  public getCurrentUser(): Iuser | null {
    const email = this.storageProvider.get<string>(this.sessionKey);
    if (!email) return null;
    return this.obtenerUsuarios().find(u => u.email === email) || null;
  }

  /** Actualiza los datos de un usuario */
  public updateUser(updatedUser: Iuser): void {
    const users = this.obtenerUsuarios();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index === -1) return;

    users[index] = { ...users[index], ...updatedUser };
    this.storageProvider.set(this.storageKey, users);
    console.log('Usuario actualizado:', users[index]);
  }
}

/** Interfaz de usuario */
export interface Iuser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}
