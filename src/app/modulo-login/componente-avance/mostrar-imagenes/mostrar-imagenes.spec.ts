import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarImagenes } from './mostrar-imagenes';

describe('MostrarImagenes', () => {
  let component: MostrarImagenes;
  let fixture: ComponentFixture<MostrarImagenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarImagenes],
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarImagenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
