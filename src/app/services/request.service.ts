import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  conseguirReceta(idReceta: string | null): any {
    return this.httpClient.get(`http://localhost/api/receta.php?id=${idReceta}`);
  }

  registrarUsuario(datos: string) {
    const params = new HttpParams().set("datos", datos);
    return this.httpClient.post(`http://localhost/api/registro.php`, null, {params});
  }

}
