import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ingrediente } from '../../interfaces/ingrediente';


@Component({
  selector: 'app-anyadir',
  standalone: true,
  imports: [
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './anyadir.component.html',
  styleUrl: './anyadir.component.css'
})
export class AnyadirComponent {
  ingredientesProvisionales: Ingrediente[] = [];

  ingredientes = new FormGroup({
    ingrediente: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required),
    unidad: new FormControl("", Validators.required)
  })

  anyadirIngrediente() {
    if(this.ingredientes.valid) {
      const ingrediente: Ingrediente = {
        nombre: this.ingredientes.value.ingrediente!,
        cantidad: parseFloat(this.ingredientes.value.cantidad!),
        unidad: this.ingredientes.value.unidad!
      }
      // this.ingredientesProvisionales.push(ingrediente);
      let existe = false;
      let posicion = 0;
      this.ingredientesProvisionales.forEach((ingredienteProvisional, i) => {
        if(ingredienteProvisional.nombre === ingrediente.nombre) {
          existe = true;
          posicion = i;
        }
      });
      if(existe) {
        this.ingredientesProvisionales[posicion].cantidad += ingrediente.cantidad;
      } else {
        this.ingredientesProvisionales.push(ingrediente);
      }
    }
  }

}
