import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaComponent } from './pages/lista/lista.component';
import { FavRecetasComponent } from './pages/fav-recetas/fav-recetas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
    {"path": "", component: InicioComponent},
    {"path": "lista", component: ListaComponent},
    {"path": "recetas", component: FavRecetasComponent},
    {"path": "contacto", component: ContactoComponent},
    {"path": "favoritos", redirectTo: "recetas"},

];
