import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario, Imagen, Login } from "../models/usuario.model";
import { LoginResponse } from "../models/LoginResponse";


@Injectable({providedIn: 'root'})

export class UserService {
  private apiUrl = 'http://localhost:8080/api/login';
  private apiurlImagen = 'http://localhost:8080/api/usuarios'
  private apiloginAutenticar = 'http://localhost:8080/api/login/authlogin'

  constructor(private http: HttpClient){}

  getLogin(): Observable<Login[]>{
    return this.http.get<Login[]>(`${this.apiUrl}`);
  }

  getUsuarioConImagenes(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiurlImagen}`);
  }

  getImagenesPorUsuario(id: number): Observable<Imagen[]>{
    return this.http.get<Imagen[]>(`${this.apiUrl}/${id}/imagenes`);
  }

  setAutenticar(correoLogin: string, contrasenaLogin: string){
     return this.http.post<LoginResponse>(`${this.apiloginAutenticar}`, {
      correoLogin, 
      contrasenaLogin
    });
  }
}
