import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TarjetaRecetaComponent } from '../../components/tarjeta-receta/tarjeta-receta.component';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-fav-recetas',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TarjetaRecetaComponent, CommonModule],
  templateUrl: './fav-recetas.component.html',
  styleUrl: './fav-recetas.component.css'
})
export class FavRecetasComponent implements OnInit {

  constructor(private requestService: RequestService,) {}

  autores: string[] = [];

  ngOnInit(): void {
    this.requestService.obtenerUsuarios()
      .subscribe((data: any) => {
        this.autores = data;
        console.log(this.autores);
      })
  }



}
