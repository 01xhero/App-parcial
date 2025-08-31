import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProvider {
  constructor(){}

  get<T>(key:string): T | null{
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }

  set(key:string, value:string){
    localStorage.setItem(key, value)
  }
}
