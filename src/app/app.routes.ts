import { Routes} from '@angular/router';
import {SobrenosotrosComponent} from './modulo-nosotros/sobrenosotros.component';
import {InicioComponent} from './modulo-inicio/iniciocomponent';
import {NuestrosserviciosComponent} from './modulo-servicios/nuestrosservicios.component';
import {NuestrosproyectosComponent} from './modulo-proyectos/nuestrosproyectos.component';
import { ContactanosComponent } from "./modulo-contacto/contactanos.component";


export const routes: Routes = [
  { path: '', component: InicioComponent, },
  { path: 'nosotros', component: SobrenosotrosComponent},
  { path: 'servicios', component: NuestrosserviciosComponent},
  {path:'proyectos', component: NuestrosproyectosComponent},
  {path:'contacto', component: ContactanosComponent},
];

