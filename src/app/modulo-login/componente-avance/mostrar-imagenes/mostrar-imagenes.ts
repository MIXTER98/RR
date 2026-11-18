import { Component, ElementRef, OnInit, signal, viewChild } from '@angular/core';
import { Imagen, Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-mostrar-imagenes',
  styleUrl: './mostrar-imagenes.css',
  templateUrl: './mostrar-imagenes.html',
})
export class MostrarImagenes implements OnInit {


  usuarios = signal<Usuario[]>([]);

  idUsuario:number = 0
  rutaImagen:string= ""
  descripcionAvance:string= ""
  fechaSubido: Date =new Date()

  constructor(private servicioUsuario: UserService) { }

  ngOnInit(): void {

    this.getImagen()
  }

  obtnerPrimeraletra(nombre: string): string[] {
    return nombre.split('');
  }

  getImagen(): void {
    this.servicioUsuario.getUsuarioConImagenes()
      .subscribe(data => {
        this.usuarios.set(data);

        console.log("USUARIOS", this.usuarios())
      });
  }

  readonly modalImagenAdd = viewChild.required<ElementRef<HTMLDialogElement>>('modalImagenAdd');

  AgregarImg(id: number) {
    const imagen: Imagen ={
      idUsuario: id,
      rutaImagen: this.rutaImagen,
      descripcionAvance: this.descripcionAvance,
      fechaSubido: this.fechaSubido
    }
    this.modalImagenAdd().nativeElement.showModal()
    this.servicioUsuario.AgregarImagen(id, imagen).subscribe({
      next: (resp) => {
        console.log('Imagnen agregado: ', resp)
        this.getImagen()
        this.modalImagenAdd().nativeElement.close();
      },
      error: (err) => {
        console.error("Error en agregar: ", err)
      }

    })
  }



}
