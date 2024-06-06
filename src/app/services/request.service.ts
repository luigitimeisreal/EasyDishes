import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  url: string = "http://localhost/api"

  constructor(private httpClient: HttpClient) { }

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

}
