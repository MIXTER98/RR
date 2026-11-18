export interface Imagen {
  idImagenes?: number;
  idUsuario: number;
  rutaImagen: string;
  descripcionAvance: string;
  fechaSubido: Date;
}


export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dniUsuario: number;
  rolUsuario: string;
  imagenes: Imagen[];
}

export interface Login {
  idLogin: number;
  correoLogin: string;
  contrasenaLogin: string;
  usuario: Usuario;
}
