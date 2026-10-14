import { Injectable } from '@angular/core';
import { AvanceModel } from '../models/avance.model';
import { Usuario } from '../models/usuario.model';
import { ImagenPorUsuario } from '../models/areglos-objetos';
import { UsuarioService } from './usuario.service';
import { I } from '@angular/cdk/keycodes';

@Injectable({ providedIn: 'root' })
export class AvanceService {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {
  }

  private imagenes: AvanceModel[] = [
    {
      id: 1,
      rutaImagen: "img-carrusel/cons1.jpg",
      idUsuario: 1,
      fecha: "15/12/2026",
      porcentaje: 50,
      descripcion: "Por culminar la primera parte"
    },
    {
      id: 1,
      rutaImagen: "img-carrusel/cons2.jpg",
      idUsuario: 2,
      fecha: "15/12/2026",
      porcentaje: 10,
      descripcion: "Por culminar la primera parte"
    },
    {
      id: 1,
      rutaImagen: "img-carrusel/cons5.jpg",
      idUsuario: 3,
      fecha: "15/09/2026",
      porcentaje: 10,
      descripcion: "Por culminar la primera parte"
    },
    {
      id: 2,
      rutaImagen: "img-carrusel/cons4.jpg",
      idUsuario: 3,
      fecha: "15/12/2026",
      porcentaje: 50,
      descripcion: "Por culminar la primera parte"
    }
  ]

  filtroPorUsuarios(): ImagenPorUsuario[] {
    const resultado: ImagenPorUsuario[] = [];
    this.usuarios = this.usuarioService.verUsuarios()
    this.usuarios.forEach(u => {
      const avanceUsuario = this.imagenes.filter(a => a.idUsuario === u.idusuario);
      const totalporcentaje = avanceUsuario.reduce((a, b) => a + (b.porcentaje || 0), 0);
      if (avanceUsuario.length > 0) {
        resultado.push({
          idusuario: { idUsuario: u.idusuario },
          usuarios: u,
          avances: avanceUsuario,
          totalporcentaje
        });
      }
    })
    console.log(resultado);
    return resultado;
  }

  /*{
      id: 1,
      rutaImagen: "img-carrusel/cons1.jpg",
      idUsuario: 1,
      fecha: "15/12/2026",
      porcentaje: 50,
      descripcion: "Por culminar la primera parte"
    },*/



}

