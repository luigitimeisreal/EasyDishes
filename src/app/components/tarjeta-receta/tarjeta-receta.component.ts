import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'tarjeta-receta',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './tarjeta-receta.component.html',
  styleUrl: './tarjeta-receta.component.css'
})
export class TarjetaRecetaComponent {

}
