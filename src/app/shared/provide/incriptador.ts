import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Incriptador {
  constructor(){}

  Incriptador(password:string){
    const passIncriptada = password;
    return passIncriptada;
  }
}
