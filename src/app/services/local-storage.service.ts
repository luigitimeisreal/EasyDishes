import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Añadir variables al localStorage
  anyadirItem(clave: string, valor: string) {
    localStorage.setItem(clave, valor)
  }

  // Obtener variables
  obtenerItem(clave: string) {
    return localStorage.getItem(clave);
  }

  // Limpiar localStorage
  limpiar(): void {
    localStorage.clear();
  }

  eliminar(clave: string):void {
    localStorage.removeItem(clave);
  }

}
