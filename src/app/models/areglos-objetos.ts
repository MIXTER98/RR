import {Usuario} from './usuario.model';
import {AvanceModel} from './avance.model';

export interface combinadoAvanceUsuario {
  usuario:Usuario;
  avances: AvanceModel[];
}

/*Areglo de cada usuario por id*/
export interface ImagenPorUsuario {
  idusuario:{idUsuario:number};
  usuarios:Usuario;
  avances:AvanceModel[];
  totalporcentaje:number;
}
