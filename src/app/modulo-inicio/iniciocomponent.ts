import {Component} from '@angular/core';
import {CarruselComponent} from './carrusel/carrusel.component';
import {ContactanosComponent} from './contactanos/contactanos.component';
import {HeroSectionComponent} from './heroSection/hero-section.component';
import {DicenComponent} from './loquedicen/dicen.component';
import {NosotrosComponent} from './nosotros/nosotros.component';
import {ProyectoComponent} from './proyectos/proyecto.component';
import {ServiciosComponent} from './servicios/servicios.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [CarruselComponent, ContactanosComponent,
    HeroSectionComponent, DicenComponent, NosotrosComponent,
    ProyectoComponent, ServiciosComponent]
})
export class InicioComponent {}
