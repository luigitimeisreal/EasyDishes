import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-anyadir',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './anyadir.component.html',
  styleUrl: './anyadir.component.css'
})
export class AnyadirComponent {

  imagenSeleccionada(evento: any) {

  }

  imagenEliminada(evento: any) {
    
  }

}
