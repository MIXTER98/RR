import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteAvance } from './componente-avance';

describe('ComponenteAvance', () => {
  let component: ComponenteAvance;
  let fixture: ComponentFixture<ComponenteAvance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteAvance],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteAvance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
