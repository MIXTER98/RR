import { Component, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-mostrar-imagenes',
  styleUrl: './mostrar-imagenes.css',
  templateUrl: './mostrar-imagenes.html',
})
export class MostrarImagenes implements OnInit {


  usuarios = signal<Usuario[]>([]);

  constructor(private servicioUsuario: UserService) { }

  ngOnInit(): void {

    this.getImagen()
  }


  getImagen(): void {
    this.servicioUsuario.getUsuarioConImagenes()
      .subscribe(data => {
        this.usuarios.set(data);

        console.log("USUARIOS", this.usuarios())
      });
  }



}
