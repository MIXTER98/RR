import { Component } from '@angular/core';
import { BarraLateral } from './barra-lateral/barra-lateral';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [BarraLateral, RouterOutlet],
  selector: 'app-componente-avance',
  styleUrl: './componente-avance.css',
  templateUrl: './componente-avance.html',
})
export class ComponenteAvance {}
