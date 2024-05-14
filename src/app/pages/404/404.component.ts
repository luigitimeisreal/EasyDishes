import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css'
})

export class NotFoundComponent {
  
}
