import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaComponent } from './pages/lista/lista.component';
import { FavRecetasComponent } from './pages/fav-recetas/fav-recetas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NotFoundComponent } from './pages/404/404.component';
import { AnyadirComponent } from './pages/anyadir/anyadir.component';
import { RecetaComponent } from './pages/receta/receta.component';

export const routes: Routes = [
    {"path": "", component: InicioComponent},
    {"path": "lista", component: ListaComponent},
    {"path": "recetas", component: FavRecetasComponent},
    {"path": "recetas", children: [
        {"path": "anyadir", component: AnyadirComponent},
        {"path": "receta/:id", component: RecetaComponent}
    ]},
    {"path": "contacto", component: ContactoComponent},
    {"path": "favoritos", redirectTo: "recetas"},
    {"path": "**", component: NotFoundComponent},
];
