import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProvider {

  constructor(){}

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch {
        return null;
      }
    }
    return null;
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
