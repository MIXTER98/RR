import { Routes} from '@angular/router';
import { RouterModule } from '@angular/router';
import {SobrenosotrosComponent} from './modulo-nosotros/sobrenosotros.component';
import {InicioComponent} from './modulo-inicio/iniciocomponent';
import {NuestrosserviciosComponent} from './modulo-servicios/nuestrosservicios.component';
import {NuestrosproyectosComponent} from './modulo-proyectos/nuestrosproyectos.component';
import { ContactanosComponent } from "./modulo-contacto/contactanos.component";
import {ModuloLogin} from './modulo-login/modulo-login';
import { ComponenteAvance } from './modulo-login/componente-avance/componente-avance';
import { MostrarImagenes } from './modulo-login/componente-avance/mostrar-imagenes/mostrar-imagenes';
import {AgregarImagenes} from './modulo-login/componente-avance/agregar-imagenes/agregar-imagenes';

export const routes: Routes = [
  { path: '', component: InicioComponent, },
  { path: 'nosotros', component: SobrenosotrosComponent},
  { path: 'servicios', component: NuestrosserviciosComponent},
  {path:'proyectos', component: NuestrosproyectosComponent},
  {path:'contacto', component: ContactanosComponent},
  {path:'login', component: ModuloLogin},
  {path:'dashboard', component: ComponenteAvance,
    children:[
      {path:'verImagenes', component: MostrarImagenes},
      {path:'agregarImagenes', component: AgregarImagenes},
    ]
  }

];

