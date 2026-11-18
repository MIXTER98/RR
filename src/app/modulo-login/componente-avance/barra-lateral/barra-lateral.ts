import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user.service';

@Component({
  imports: [CommonModule],
  selector: 'app-barra-lateral',
  styleUrl: './barra-lateral.css',
  templateUrl: './barra-lateral.html',
})
export class BarraLateral implements OnInit {
  constructor(private router: Router, private usuarioService: UserService) { }
  Avances: string[] = ['VER IMAGEN', 'VER USUARIOS', 'ELIMINAR IMAGEN', 'EDITAR IMAGEN', 'CERRAR SESION']
  usuarios: Usuario[] =[]

  seleccionado: string | null = 'VER IMAGEN';

  nombre = localStorage.getItem('nombre');
  apellido = localStorage.getItem('apellido')
  rol = localStorage.getItem('rol')
  correo = localStorage.getItem('correo')


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
