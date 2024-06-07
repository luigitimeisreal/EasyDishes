import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private requestService: RequestService
  ) {}

  recetas: any = [];

  ngOnInit(): void {
    const ahora = new Date();
    const diaActual = ahora.getDay();
    const diaGuardado = Number(this.localStorageService.obtenerItem("dia"));

    console.log(diaActual, diaGuardado);    
    if(diaActual !== diaGuardado) {
      console.log("Nuevo día");
      // Cargar nuevas recetas
      this.requestService.obtenerRecetasDiarias()
        .subscribe((data) => {
          console.log(data);
          this.recetas = data;
          this.localStorageService.anyadirItem("recetas", JSON.stringify(this.recetas));
          this.localStorageService.anyadirItem("dia", String(diaActual));
        })
    } else {
      console.log("Entra");
      
      this.recetas = JSON.parse(this.localStorageService.obtenerItem("recetas")!);
    }

  }
  
}
