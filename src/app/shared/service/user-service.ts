import { Injectable } from '@angular/core';
import { StorageProvider } from '../provide/storage-provider';
import { Incriptador } from '../provide/incriptador';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storagProvider: StorageProvider, private incriptar:Incriptador){}

  crearUsuario(user:Iuser){
    user.password = this.incriptar.Incriptador(user.password);
    this.storagProvider.set('user', JSON.stringify(user));
  }
}

export interface Iuser{
  id:string,
  name:string,
  lastName:string,
  password:string,
  country:string
}