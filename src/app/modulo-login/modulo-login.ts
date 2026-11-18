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

  logins: Login[] = [];

  constructor(private UsuarioService: UserService, private router: Router, 
      private cdr : ChangeDetectorRef
  ) { }

  funcionlogin(): void {
    this.UsuarioService
      .setAutenticar(
        this.nombreLogin,
        this.contrasena)
      .subscribe({
        next: (respuesta) => {
          this.mensaje = respuesta.mensaje;
          this.tipomensaje =
          respuesta.mensaje === "Usuario logueado"
          ? "exito"
          : "error"
          this.cdr.detectChanges();

          if(this.mensaje === "Usuario logueado"){
            localStorage.setItem(
              'autenticado',
              'true'
            )
            this.router.navigate(['/avanceImagenes/verImagenes'])
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
  }
}
