import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Ingrediente } from '../../interfaces/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private requestService: RequestService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ingredientes: Ingrediente[] = [];
  idLista: string = "";

  formAnyadir = new FormGroup({
    ingrediente: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required),
    unidad: new FormControl("", Validators.required),
  })

  ngOnInit(): void {
    this.idLista = this.ruta.snapshot.paramMap.get('id')!;
    this.requestService.obtenerFechaAutorLista(this.idLista)
      .subscribe((data: any) => {
        if(!data) {
          alert("Esta lista no existe");
          this.router.navigateByUrl("/listas");
        }
        if(data.usuario !== this.localStorageService.obtenerItem("dni")) {
          alert("No puedes acceder a esta lista, inicia sesión");
          this.router.navigateByUrl("/login");
        }
        this.requestService.obtenerIngredientesLista(this.idLista)
          .subscribe((data2: any) => {
            console.log("Obteniendo ingredientes", data2);
            this.ingredientes = data2;
          })
      })
  }

  anyadirIngrediente() {
    if(this.formAnyadir.valid) {
      console.log(this.formAnyadir.value);
      let existe = false;
      let posicion = 0;
      this.ingredientes.forEach((ingrediente, i) => {
        if(ingrediente.nombre === this.formAnyadir.value.ingrediente) {
          existe = true;
          posicion = i;
        }
      });
      if(existe) {
        this.ingredientes[posicion].cantidad = Number(this.ingredientes[posicion].cantidad) + parseFloat(this.formAnyadir.value.cantidad!);
        // Eliminar ingrediente de il
        const datosEliminar = {
          idIngrediente: this.ingredientes[posicion].id,
          idLista: this.idLista
        }

        this.requestService.eliminarIngredienteLista(datosEliminar)
          .subscribe((data) => {
            console.log(data);
            // Añadir nuevo ingrediente
            const datosAnyadir = {
              "nombre": this.ingredientes[posicion].nombre,
              "cantidad": this.ingredientes[posicion].cantidad,
              "unidad": this.ingredientes[posicion].unidad,
              "idLista": this.idLista
            }
            this.requestService.anyadirIngredienteLista(datosAnyadir)
              .subscribe((data2) => {
                console.log("Recibiendo", data2);
              })

          })
        
      } else {
        const nuevoIngrediente: Ingrediente = {
          nombre: this.formAnyadir.value.ingrediente!,
          cantidad: parseFloat(this.formAnyadir.value.cantidad!),
          unidad: this.formAnyadir.value.unidad!
        }
        this.ingredientes.push(nuevoIngrediente);
        // Añadir ingrediente y campo en il
        const datosAnyadir = {
          "nombre": nuevoIngrediente.nombre,
          "cantidad": nuevoIngrediente.cantidad,
          "unidad": nuevoIngrediente.unidad,
          "idLista": this.idLista
        }
        this.requestService.anyadirIngredienteLista(datosAnyadir)
          .subscribe((data2) => {
            console.log("Recibiendo", data2);
          })
      }
    } else {
      console.log("Error en el formulario");
    }
  }

  eliminarIngrediente(ingrediente: Ingrediente) {
    this.ingredientes = this.ingredientes.filter(ingredientePotencial => {
      return ingredientePotencial.nombre !== ingrediente.nombre
    })

    const datosEliminar = {
      idIngrediente: ingrediente.id,
      idLista: this.idLista
    }

    this.requestService.eliminarIngredienteLista(datosEliminar)
      .subscribe((data) => {
        console.log("Entra");
        console.log(data);
      })

  }

  eliminarTodosIngredientes() {
    this.ingredientes = [];
    // Eliminar tabla con ingredientes
    this.requestService.eliminarTodosIngredientes(this.idLista)
      .subscribe((data) => {
        console.log("Recibiendo", data);
      })
  }

  generarPDF() {
    const ticket = []
    if(this.ingredientes.length === 0) ticket.push("Lista vacía. Añade ingredientes")
    this.ingredientes.forEach((ingrediente) => {
      ticket.push(`${ingrediente.nombre} x${ingrediente.cantidad} ${ingrediente.unidad}`)
    })
    ticket.push("Creado con EasyDishes");
    let definicionLista = {
      content: ticket
    }
    pdfMake.createPdf(definicionLista).open();
  }

}
