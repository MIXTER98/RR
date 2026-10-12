import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsuarioService} from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-modulo-login',
  styleUrl: './modulo-login.css',
  templateUrl: './modulo-login.html',
})
export class ModuloLogin {
  nombreLogin: string = '';
  constrasena: string = '';
  mensaje: string = '';
  rol: string = '';
  tipoMensaje: 'exito' | 'error'|''='';

  constructor(private usuarioService: UsuarioService, private router: Router) {}
  login(): void {
    if(!this.nombreLogin || !this.constrasena){
      this.mensaje = 'Por favor, complete todos los campos!';
      this.tipoMensaje = 'error';
    return;
  }
    const autencado = this.usuarioService.autenticarUsuario(
      this.nombreLogin,
      this.constrasena,
      this.rol,
    );

    if(autencado){
    this.mensaje ='Login corecto, !Bienvenido';
    this.tipoMensaje ='exito';
    //Redirige a otra ruta
      this.router.navigate(['/dashboard']);
    } else{
    this.mensaje ='Usuario o contraseña incorrecto';
    this.tipoMensaje ='error';
    }
  }


}
