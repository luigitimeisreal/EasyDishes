import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recetas-autor',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './recetas-autor.component.html',
  styleUrl: './recetas-autor.component.css'
})
export class RecetasAutorComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private requestService: RequestService,
  ) {}

  dniAutor: string = "";
  recetas:any = [];

  ngOnInit(): void {
    this.dniAutor = this.ruta.snapshot.paramMap.get('autor')!;
    this.requestService.obtenerRecetasAutor(this.dniAutor)
      .subscribe((data) => {
        this.recetas = data;
        console.log(this.recetas);
      })
  }

}
