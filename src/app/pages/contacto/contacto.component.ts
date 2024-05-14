import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  errors = [
    {type: "required", message: "El campo no puede estar vacío"},
    {type: "email", message: "El campo debe ser un email"},
    {type: "maxlength", message: "El campo debe ser de menor longitud"},
    {type: "pattern", message: "No se pueden usar palabras malsonantes"},
  ]

  contacto = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    nombre: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    apellido1: new FormControl("", Validators.maxLength(12)),
    apellido2: new FormControl("", Validators.maxLength(12)),
    telefono: new FormControl("", Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
    mensaje: new FormControl("", [Validators.required, Validators.pattern('^(?!.*\\b(Joder|joder|Mierda|mierda|Coño|coño|Puta|puta|Cabron|cabron|Hostia|hostia)\\b).*')])
  })

  enviarMensaje() {
    if(this.contacto.valid) {
      // Enviar a la API this.contacto.value
      console.log(this.contacto.value);
    } else {
      console.log("Error, no se ha enviado el mensaje");
    }
  }

}
