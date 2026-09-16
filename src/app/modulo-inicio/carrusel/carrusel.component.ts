import {Component, OnDestroy, signal} from '@angular/core';
import {App} from '../../app';

@Component({
  selector: 'app-carrusel',
  templateUrl: 'carrusel.component.html',
  styleUrls: ['carrusel.component.css']
})
export class CarruselComponent implements OnDestroy {
  imagenes = signal<string[]> ([
    "img-carrusel/cons1.jpg",
    "img-carrusel/cons2.jpg",
    "img-carrusel/cons3.jpg",
    "img-carrusel/cons4.jpg",
    "img-carrusel/cons5.jpg",
  ]);
  indiceActual = signal(0)

  private  intervalo: any;

  constructor() {
    this.intervalo = setInterval(()=>{
      const nuevoIndice = (this.indiceActual()+1)% this.imagenes().length;
      this.indiceActual.set(nuevoIndice);
    }, 3000)
  }
  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}
