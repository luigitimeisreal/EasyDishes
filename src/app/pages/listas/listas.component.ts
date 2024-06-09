import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent implements OnInit {

  listas: any = [];

  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const dniUsuario = this.localStorageService.obtenerItem("dni");
    this.requestService.obtenerListasIdFechas(dniUsuario!)
      .subscribe((data) => {
        console.log(data);
        this.listas = data;
      })
  }

  anyadirLista() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getUTCMonth() + 1;
    const diaActual = fechaActual.getUTCDate();
    const anyoActual = fechaActual.getUTCFullYear();
    const dniUsuario = this.localStorageService.obtenerItem("dni");
    const datos = {
      fecha: `${anyoActual}/${mesActual}/${diaActual}`,
      usuario: dniUsuario
    }
    this.requestService.anyadirLista(datos)
      .subscribe((id) => {
        console.log("Recibiendo", id);
        this.router.navigateByUrl(`/listas/lista/${id}`);
      })
  }


  
}
