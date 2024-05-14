import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';


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
  ingredientesCantidadesProvisionales: string[] = [];

  ingredientes = new FormGroup({
    ingrediente: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required)
  })

  imagenSeleccionada(evento: any) {

  }

  imagenEliminada(evento: any) {
    
  }

  anyadirIngrediente() {
    if(this.ingredientes.valid) {
      this.ingredientesCantidadesProvisionales.push(`${this.ingredientes.value.ingrediente}: x${this.ingredientes.value.cantidad}`)
    }
  }

}
