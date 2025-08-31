import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Incriptador {

  // Encriptar contraseña
  hash(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  // Comparar contraseña ingresada con la almacenada
  compare(password: string, hash: string): boolean {
    const hashed = this.hash(password);
    return hashed === hash;
  }
}
