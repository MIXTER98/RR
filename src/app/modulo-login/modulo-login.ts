import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../models/usuario.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-modulo-login',
  styleUrl: './modulo-login.css',
  templateUrl: './modulo-login.html',
})
export class ModuloLogin implements OnInit, OnDestroy {

  nombreLogin: string = "";
  contrasena: string = "";

  mensaje: string = "";
  tipomensaje: string = "";
  rol: string = "";


  constructor(private UsuarioService: UserService, private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  funcionlogin(): void {
    this.UsuarioService
      .setAutenticar(
        this.nombreLogin,
        this.contrasena)
      .subscribe({
        next: (respuesta: any) => {
          console.log(respuesta)
          this.mensaje = respuesta.mensaje;
          this.rol = respuesta.rol
          this.tipomensaje =
            respuesta.mensaje === "Usuario logueado"
              ? "exito"
              : "error"

          this.cdr.detectChanges();

          if (this.mensaje === "Usuario logueado") {
            localStorage.setItem(
              'autenticado',
              'true'
            );
            localStorage.setItem('nombre', respuesta.nombre)
            localStorage.setItem('apellido', respuesta.apellido)
            localStorage.setItem('rol', respuesta.rol)
            localStorage.setItem('correo', respuesta.email)
            if (this.rol === 'admin') {
              this.router.navigate(['/avanceImagenes/verImagenes'])
            } else if (this.rol === 'usuario') {
              console.log('Vista usuarios')
            }

          }
        },


        error: (error) => {
          console.log(error)
        },
        complete: () => { console.log("Acción culminada") }
      })

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.nombreLogin = '';
    this.contrasena = '';
    this.mensaje = '';
    this.tipomensaje = '';
    this.rol = '';
  }
}
