import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { RecetaComponent } from './pages/receta/receta.component';
import { Receta } from './interfaces/receta';
// import { ContactoComponent } from './pages/contacto/contacto.component';
// import { ListaComponent } from './pages/lista/lista.component';
// import { AnyadirComponent } from './pages/anyadir/anyadir.component';
// import { InicioComponent } from './pages/inicio/inicio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
