import {Usuario} from '../models/usuario.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      idusuario: 1,
      nombrelogin: "Jorge@gmail.com",
      nombreusuario: "Jorge",
      apellidosusuario: "Huaman Pillaca",
      contrasena: "123456789",
      rol: "admin"
    },
    {
      idusuario: 2,
      nombrelogin: "Pedro@gmail.com",
      nombreusuario: "Pedro",
      apellidosusuario: "Sulca Ramos",
      contrasena: "987654321",
      rol: "user"
    }
  ];

  autenticarUsuario(nombrelogin:string,contrasena: string, rol:string):boolean {
    return this.usuarios.some(u =>u.nombrelogin === nombrelogin && u.contrasena === contrasena && u.rol === rol);
  };

  verUsuarios (): Usuario[]{
    return this.usuarios;
  };

  crearUsuario(usuario:Usuario):void {
    console.log("Creando Usuario");
    const nuevoId = this.usuarios.length > 0
    ? Math.max(...this.usuarios.map(u=>u.idusuario)) + 1
      : 1;
    usuario.idusuario = nuevoId;
    this.usuarios.push(usuario);
  }

  editarUsuario(usuario:Usuario):void {
    const index = this.usuarios.findIndex(u => u.idusuario === usuario.idusuario);
    if (index >= 0){
      this.usuarios[index] = usuario;
    }
  }
  eliminarUsuario(id: number): void{
    this.usuarios = this.usuarios.filter(u => u.idusuario === id);
  }
}
