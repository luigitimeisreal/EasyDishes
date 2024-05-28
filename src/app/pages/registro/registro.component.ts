import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  validacionContrasenya: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  coincideContrasenya = true;
  
  constructor(private requestService: RequestService) {}

  errores = [
    {type: "required", message: "El campo no puede estar vacío"},
    {type: "pattern", message: "La entrada no es válida"},
    {type: "maxlength", message: "La entrada es muy larga"},
    {type: "email", message: "El campo debe ser un email"}
  ]

  registro = new FormGroup({
    dni: new FormControl("", [Validators.required, Validators.pattern("[0-9]{8}[A-Z]")]),
    nombre: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    apellido1: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    apellido2: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    telefono: new FormControl("", [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]),
    email: new FormControl("", [Validators.required, Validators.email]),
    contrasenya1: new FormControl("", [Validators.required, Validators.pattern(this.validacionContrasenya)]),
    contrasenya2: new FormControl("", Validators.required)
  })

  registrarUsuario() {
    if(this.registro.valid) {
      // console.log(this.registro.value);
      this.coincideContrasenya = this.registro.value.contrasenya1 === this.registro.value.contrasenya2;
      if(this.coincideContrasenya) {
        // Enviar datos de registro al servidor
        console.log("Enviando datos", this.registro.value);
        console.log(JSON.stringify(this.registro.value));
        this.requestService.registrarUsuario(this.registro.value)
          .subscribe((data) => {
            console.log(data);
          })
        this.registro.reset();
      }
    } else {
      console.log("Errores en el registro");
    }
  }

}
