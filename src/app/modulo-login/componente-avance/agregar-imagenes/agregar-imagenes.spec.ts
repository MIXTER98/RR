import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarImagenes } from './agregar-imagenes';

describe('AgregarImagenes', () => {
  let component: AgregarImagenes;
  let fixture: ComponentFixture<AgregarImagenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarImagenes],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarImagenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
