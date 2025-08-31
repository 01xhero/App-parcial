import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Incriptador {

  hash(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  compare(password: string, hash: string): boolean {
    return this.hash(password) === hash;
  }
}
