import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { AvanceService } from '../../../services/avance.service';
import { ImagenPorUsuario } from '../../../models/areglos-objetos';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-mostrar-imagenes',
  styleUrl: './mostrar-imagenes.css',
  templateUrl: './mostrar-imagenes.html',
})
export class MostrarImagenes {
  Usuarios: ImagenPorUsuario [] = [];
  constructor(private servicioUsuario: AvanceService ){
    this.Usuarios = this.servicioUsuario.filtroPorUsuarios()
  }
}
