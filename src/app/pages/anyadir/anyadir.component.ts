import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ingrediente } from '../../interfaces/ingrediente';
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';


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
  hayIngredientes: boolean = false;
  imagen?: File;
  rutaImagen: any = "";

  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService,
  ) {}

  errores = [
    {type: "required", message: "El campo no puede estar vacío"},
    {type: "pattern", message: "La entrada no es válida"},
    {type: "maxlength", message: "La entrada es muy larga"},
  ]

  ingredientes = new FormGroup({
    ingrediente: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required),
    unidad: new FormControl("", Validators.required)
  })

  anyadirRecetaForm = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    etapa: new FormControl("Desayuno", Validators.required),
    preparacion: new FormControl("", Validators.required)
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
        this.hayIngredientes = true;
      }
    }
  }

  cuandoImagenSeleccionada(event: any) {
    this.imagen = event.target?.files[0];
  }

  subirReceta() {
    if(this.anyadirRecetaForm.valid && this.hayIngredientes && this.imagen) {
      console.log("Entra");
      // Transformar datos a blob
      const lector = new FileReader();
      lector.readAsArrayBuffer(this.imagen);
      lector.onload = () => {
        const blobObjeto = new Blob([lector.result as BlobPart], {type: this.imagen?.type})
        const lectorBlob = new FileReader();
        lectorBlob.readAsText(blobObjeto);
        lectorBlob.onload = () => {
          const blobFinal = lectorBlob.result;
          console.log("Enviando datos: ", this.anyadirRecetaForm.value, this.ingredientesProvisionales);
          console.log(blobFinal);
          // Crear URL con imagen
          this.rutaImagen = URL.createObjectURL(blobObjeto);
          console.log(this.rutaImagen);
          // Mandar datos
          const datosFinales: any = this.anyadirRecetaForm.value;
          datosFinales.imagen = JSON.stringify(blobObjeto);
          datosFinales.ingredientes = this.ingredientesProvisionales;
          // Añadir autor datos
          datosFinales.autor = this.localStorageService.obtenerItem("dni")
          // Añadir fecha
          const fechaActual = new Date();
          const mesActual = fechaActual.getUTCMonth() + 1;
          const diaActual = fechaActual.getUTCDate();
          const anyoActual = fechaActual.getUTCFullYear();
          datosFinales.fecha = `${anyoActual}/${mesActual}/${diaActual}`
          console.log(datosFinales);
          this.requestService.subirReceta(datosFinales)
            .subscribe((data) => {
              console.log("Final", data);
            })
        }
        
      }
    }
  }



}
