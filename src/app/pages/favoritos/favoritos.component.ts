import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { RequestService } from '../../services/request.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {

  dniUsuario = "";
  recetas: any = []

  constructor(
    private localStorageService: LocalStorageService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.dniUsuario = this.localStorageService.obtenerItem("dni")!;
    this.actualizarRecetas();
  }

  eliminarFavorito(idReceta: string) {
    console.log("Eliminando", idReceta);
    const datosFavorito = {
      receta: idReceta,
      usuario: this.localStorageService.obtenerItem("dni")
    }
    this.requestService.eliminarFavorito(datosFavorito)
      .subscribe((data) => {
        console.log("Recibiendo", data);
        this.actualizarRecetas();
      })
  }

  actualizarRecetas() {
    this.requestService.obtenerFavoritos(this.dniUsuario)
      .subscribe((data) => {
        console.log(data);
        this.recetas = data;
      })
  }

}
