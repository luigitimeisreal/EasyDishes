import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fav-recetas',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './fav-recetas.component.html',
  styleUrl: './fav-recetas.component.css'
})
export class FavRecetasComponent {

}
