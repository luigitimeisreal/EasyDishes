import { Component, Input, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  @Input()
  receta!: Receta;

  id: string = "";
  urlFacebook = `https://www.facebook.com/sharer.php?u=${window.location.href}`
  urlX = `https://twitter.com/intent/tweet?url=${window.location.href}&text=Mira+esta+receta`
  urlLinkedin = `https://www.linkedin.com/shareArticle?url=${window.location.href}&title=Receta&summary=Mira+esta+receta`

  ngOnInit(): void {
    console.log(this.receta);
    console.log("ID RECETA: ", this.ruta.snapshot.paramMap.get('id'));
    this.obtenerReceta(this.ruta.snapshot.paramMap.get('id'));
  }

  anyadirIngredientesALista() {
    console.log("Mandando ingredientes de receta a la lista de la compra");
    console.log(this.receta.ingredientes);
  }

  obtenerReceta(idReceta: string | null) {
    this.httpClient
      .get(`http://localhost/api/receta.php?id=${idReceta}`)
      .subscribe((data: any) => {
        console.log("DAtos receta", data);
        if(!data) {
          this.router.navigate(['/noexiste']);
        }
        console.log("Entra");
        this.receta = data;
      })
  }


}
