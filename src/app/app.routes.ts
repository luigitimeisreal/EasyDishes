import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaComponent } from './pages/lista/lista.component';
import { FavRecetasComponent } from './pages/fav-recetas/fav-recetas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NotFoundComponent } from './pages/404/404.component';
import { AnyadirComponent } from './pages/anyadir/anyadir.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { RecetasEtapaComponent } from './pages/recetas-etapa/recetas-etapa.component';
import { RecetasAutorComponent } from './pages/recetas-autor/recetas-autor.component';
import { authGuard } from './guards/auth.guard';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ListasComponent } from './pages/listas/listas.component';

export const routes: Routes = [
    {"path": "", component: InicioComponent},
    {"path": "listas", component: ListasComponent, canActivate:[authGuard]},
    {"path": "listas", children: [
        {"path": "lista/:id", component: ListaComponent, canActivate:[authGuard]}
    ]},
    {"path": "recetas", component: FavRecetasComponent},
    {"path": "recetas", children: [
        {"path": "anyadir", component: AnyadirComponent, canActivate:[authGuard]},
        {"path": "receta/:id", component: RecetaComponent},
        {"path": "etapa/:etapa", component: RecetasEtapaComponent},
        {"path": "autor/:autor", component: RecetasAutorComponent},
    ]},
    {"path": "contacto", component: ContactoComponent, canActivate:[authGuard]},
    {"path": "registro", component: RegistroComponent},
    {"path": "login", component: LoginComponent},
    {"path": "favoritos", component: FavoritosComponent, canActivate:[authGuard]},
    {"path": "**", component: NotFoundComponent},
];
