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
  title = 'EasyDishes';
  ingredientes = ["Carne", "Salsa", "Patatas", "Harina", "Sal", "Aceite"];
  // Usado para probar componente receta
  recetaPrueba: Receta = {
    imagen: "https://tienda.senorio.es/es/wp-content/uploads/2021/02/Tataki-de-secreto-iberico-de-bellota-senorio-de-montanera.jpg",
    nombre: "Secreto Ibérico",
    preparacion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a dolor velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas lobortis porta mattis. Proin iaculis auctor sem, eget varius metus mattis sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non dolor mauris. Nunc tincidunt lorem sit amet facilisis posuere. Nulla facilisi. Nam purus magna, molestie non tincidunt in, commodo quis ligula. Sed eu urna vulputate, condimentum tellus in, varius sem.",
    ingredientes: this.ingredientes
  }


}
