import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  // url: string = "http://localhost/api"
  url: string = "http://easydishes.es/api"

  constructor(private httpClient: HttpClient) { 
    console.log(this.url);    
  }

  conseguirReceta(idReceta: string | null): any {
    return this.httpClient.get(`${this.url}/receta.php?id=${idReceta}`);
  }

  registrarUsuario(datos: Object) {
    // const params = new HttpParams().set("datos", datos.toString());
    return this.httpClient.post(`${this.url}/registro.php`, datos);
  }

  comprobarUsuario(dni: string, contrasenya: string) {
    return this.httpClient.get(`${this.url}/inicioSesion.php?dni=${dni}&cont=${contrasenya}`);
  }

  subirReceta(datos: Object) {
    return this.httpClient.post(`${this.url}/anyadirReceta.php`, datos)
  }

  obtenerUsuarios() {
    return this.httpClient.get(`${this.url}/obtener3Usuarios.php`)
  }

  obtenerRecetasEtapa(etapa: string) {
    return this.httpClient.get(`${this.url}/recetasEtapa.php?etapa=${etapa}`);
  }

  obtenerRecetasAutor(autor: string) {
    return this.httpClient.get(`${this.url}/recetasAutor.php?autor=${autor}`);
  }

  obtenerRecetasContacto() {
    return this.httpClient.get(`${this.url}/recetasnombreID.php`);
  }

  subirMensaje(datos: Object) {
    return this.httpClient.post(`${this.url}/subirMensaje.php`, datos)
  }

  anyadirFavorito(datos: Object) {
    return this.httpClient.post(`${this.url}/subirFavorito.php`, datos)
  }

  obtenerFavoritos(dni: string) {
    return this.httpClient.get(`${this.url}/obtenerFavoritos.php?usuario=${dni}`);
  }

  eliminarFavorito(datos: Object) {
    return this.httpClient.post(`${this.url}/eliminarFavorito.php`, datos);
  }

  obtenerRecetasDiarias() {
    return this.httpClient.get(`${this.url}/obtenerRecetasDia.php`);
  }

  obtenerFechaAutorLista(idLista: string) {
    return this.httpClient.get(`${this.url}/obtenerFechaAutorLista.php?id=${idLista}`);
  }

  obtenerIngredientesLista(idLista: string) {
    return this.httpClient.get(`${this.url}/obtenerIngredientesLista.php?id=${idLista}`);
  }

  eliminarIngredienteLista(datos: Object) {
    return this.httpClient.post(`${this.url}/eliminarIngredienteLista.php`, datos);
  }

  eliminarTodosIngredientes(idLista: string) {
    return this.httpClient.post(`${this.url}/eliminarTodosIngredientesLista.php`, idLista);
  }

  anyadirIngredienteLista(datos: Object) {
    return this.httpClient.post(`${this.url}/anyadirIngredienteLista.php`, datos);
  }

  obtenerListasIdFechas(dniUsuario: string) {
    return this.httpClient.get(`${this.url}/obtenerListasIdFechas.php?usuario=${dniUsuario}`);
  }

  anyadirLista(datos: Object) {
    return this.httpClient.post(`${this.url}/anyadirLista.php`, datos);
  }

}
