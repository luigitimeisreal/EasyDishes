import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  ingredientesCantidades: string[] = [];

  formAnyadir = new FormGroup({
    ingrediente: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required)
  })

  anyadirIngrediente() {
    if(this.formAnyadir.valid) {
      console.log(this.formAnyadir.value);
      // Añadir
      let elementoLista = `${this.formAnyadir.value.ingrediente}: x${this.formAnyadir.value.cantidad}`
      this.ingredientesCantidades.push(elementoLista);
    } else {
      console.log("Error en el formulario");
    }
  }

  eliminarIngrediente(ingrediente: string) {
    console.log(ingrediente);
  }

  eliminarTodosIngredientes() {
    this.ingredientesCantidades = [];
    // Eliminar tabla con ingredientes
  }

  generarPDF() {
    const contenidoLista = [...this.ingredientesCantidades];
    if(contenidoLista.length === 0) {
      contenidoLista.push("Lista vacía. Añade ingredientes");
    }
    contenidoLista.push("Creado con EasyDishes");
    let definicionLista = {
      content: contenidoLista
    }

    pdfMake.createPdf(definicionLista).open();

  }

}
