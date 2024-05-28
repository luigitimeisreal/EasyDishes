import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService
  ) {}

  entrada = new FormGroup({
    dni: new FormControl("", Validators.required),
    contrasenya: new FormControl("", Validators.required)
  })

  verificarUsuario() {
    if(this.entrada.valid) {
      console.log("Comprobando los datos del usuario");
      this.requestService.comprobarUsuario(this.entrada.value.dni!, this.entrada.value.contrasenya!)
        .subscribe((data) => {
          if(data) {
            // alert("Sesión iniciada");
            this.localStorageService.anyadirItem("dni", this.entrada.value.dni!);
            this.localStorageService.anyadirItem("sesionIniciada", "true");
          } else {
            // alert("Sesión no iniciada");
          }
        })
    }
  }

}
