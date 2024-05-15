import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TarjetaRecetaComponent } from '../../components/tarjeta-receta/tarjeta-receta.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fav-recetas',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TarjetaRecetaComponent, CommonModule],
  templateUrl: './fav-recetas.component.html',
  styleUrl: './fav-recetas.component.css'
})
export class FavRecetasComponent {

}
