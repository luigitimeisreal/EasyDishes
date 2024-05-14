import { Component, Input, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent implements OnInit {
  @Input()
  receta!: Receta;

  ngOnInit(): void {
      console.log(this.receta);
  }

  anyadirIngredientesALista() {
    console.log("Mandando ingredientes de receta a la lista de la compra");
    console.log(this.receta.ingredientes);
  }


}
