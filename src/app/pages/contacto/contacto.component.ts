import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService
  
  ) {}

  recetas:any = [];

  errors = [
    {type: "required", message: "El campo no puede estar vacío"},
    {type: "pattern", message: "No se pueden usar palabras malsonantes"},
  ]

  contacto = new FormGroup({
    mensaje: new FormControl("", [Validators.required, Validators.pattern('^(?!.*\\b(Joder|joder|Mierda|mierda|Coño|coño|Puta|puta|Cabron|cabron|Hostia|hostia)\\b).*')]),
    recetaDirigida: new FormControl(this.recetas[0], Validators.required),
  })

  ngOnInit(): void {
    this.requestService.obtenerRecetasContacto()
      .subscribe((data) => {
        this.recetas = data;
      })
  }

  enviarMensaje() {
    if(this.contacto.valid) {
      // Enviar a la API this.contacto.value
      console.log(this.contacto.value);
      const datosMensaje: any = this.contacto.value;
      datosMensaje.usuario = this.localStorageService.obtenerItem("dni");
      this.requestService.subirMensaje(this.contacto.value)
        .subscribe((data) => {
          console.log("REspuesta", data);
        })
    } else {
      console.log("Error, no se ha enviado el mensaje");
    }
  }
}
