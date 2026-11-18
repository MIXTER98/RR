import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-barra-lateral',
  styleUrl: './barra-lateral.css',
  templateUrl: './barra-lateral.html',
})
export class BarraLateral implements OnInit {
  constructor(private router: Router) { }
  Avances: string[] = ['VER IMAGEN', 'VER USUARIOS', 'ELIMINAR IMAGEN', 'EDITAR IMAGEN', 'CERRAR SESION']

  seleccionado: string | null = 'VER IMAGEN'

  ngOnInit(): void {
    this.router.navigate(['/avanceImagenes/verImagenes']);
  }
  seleccionar(b: string) {
    this.seleccionado = b;
    if (this.seleccionado === 'VER IMAGEN') {
      this.router.navigate(['/avanceImagenes/verImagenes'])
    } else if (this.seleccionado === 'VER USUARIOS') {
      this.router.navigate(['/avanceImagenes/agregarImagenes'])
    } else if (this.seleccionado === 'CERRAR SESION') {
      this.cerrarSesion()
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('autenticado');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

}
