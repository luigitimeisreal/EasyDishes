import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recetas-etapa',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './recetas-etapa.component.html',
  styleUrl: './recetas-etapa.component.css'
})
export class RecetasEtapaComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private requestService: RequestService,
  ) {}

  etapa: string = "";
  recetas:any = [];

  ngOnInit(): void {
    this.etapa = this.ruta.snapshot.paramMap.get('etapa')!;
    this.requestService.obtenerRecetasEtapa(this.etapa)
      .subscribe((data) => {
        this.recetas = data;
        console.log(this.recetas);
        
      })
  }

}
