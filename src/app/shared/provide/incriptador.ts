import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; // Import correcto en Angular/Ionic

@Injectable({
  providedIn: 'root'
})
export class Incriptador {

  constructor() {}

  hash(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  compare(password: string, hash: string): boolean {
    return this.hash(password) === hash;
  }
}
