import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestService } from '../../services/request.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private requestService: RequestService,
    private localStorageService: LocalStorageService
  ) {}

  @Input()
  receta!: Receta;

  id: string = "";
  urlFacebook = `https://www.facebook.com/sharer.php?u=${window.location.href}`
  urlX = `https://twitter.com/intent/tweet?url=${window.location.href}&text=Mira+esta+receta`
  urlLinkedin = `https://www.linkedin.com/shareArticle?url=${window.location.href}&title=Receta&summary=Mira+esta+receta`
  rutaImagen = "";
  dniUsuario: string | null = "";
  hayListas: boolean = true;
  listas: any = [];

  anyadirForm = new FormGroup({
    lista: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    console.log(this.receta);
    console.log("ID RECETA: ", this.ruta.snapshot.paramMap.get('id'));
    this.obtenerReceta(this.ruta.snapshot.paramMap.get('id'));
    this.dniUsuario = this.localStorageService.obtenerItem("dni");
    // Añadir listas
    this.requestService.obtenerListasIdFechas(this.dniUsuario!)
      .subscribe((data: any) => {
        if(data.length === 0) {
          this.hayListas = false;
        } else {
          this.listas = data;
        }
      })
  }

  anyadirIngredientesALista() {
    console.log("Mandando ingredientes de receta a la lista de la compra");
    console.log(this.receta.ingredientes);
    console.log(this.anyadirForm.value);
    const ingredientesAnyadir = [];
    for(let ingredienteAnyadirLista of this.receta.ingredientes) {
      console.log("Entrada");
      const datosAnyadir = {
        "nombre": ingredienteAnyadirLista.nombre,
        "cantidad": ingredienteAnyadirLista.cantidad,
        "unidad": ingredienteAnyadirLista.unidad,
        "idLista": this.anyadirForm.value.lista
      }
      ingredientesAnyadir.push(datosAnyadir);
    }
    // Enviar 
    
  }

  obtenerReceta(idReceta: string | null) {
    this.requestService.conseguirReceta(idReceta)
      .subscribe((data:any) => {
        if(!data) {
          this.router.navigate(['/noexiste']);
        }
        this.receta = data;
        this.rutaImagen = this.receta.imagen;
        console.log("Receta cargada");
      })
  }

  anyadirFavorito() {
    const conjuntoUsuarioReceta = {
      usuario: this.localStorageService.obtenerItem("dni"),
      receta: this.ruta.snapshot.paramMap.get('id')
    };
    this.requestService.anyadirFavorito(conjuntoUsuarioReceta)
      .subscribe((data) => {
        console.log("Recibiendo", data);
        alert("Receta añadida a favoritos")
      })

  }

}
