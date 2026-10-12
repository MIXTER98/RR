import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-barra-lateral',
  styleUrl: './barra-lateral.css',
  templateUrl: './barra-lateral.html',
})
export class BarraLateral {
constructor(private router: Router){}
  Avances: string[] = ['VER IMAGEN','VER USUARIOS', 'ELIMINAR IMAGEN', 'EDITAR IMAGEN']

  seleccionado: string | null = 'VER IMAGEN'
  seleccionar(b: string){
      this.seleccionado = b;
      if(this.seleccionado === 'VER IMAGEN'){
          this.router.navigate(['/dashboard/verImagenes'])
      }else if(this.seleccionado === 'VER USUARIOS'){
        this.router.navigate(['/dashboard/agregarImagenes'])
        console.log("CAMBIO")
      }
  }

}
