import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuloLogin } from './modulo-login';

describe('ModuloLogin', () => {
  let component: ModuloLogin;
  let fixture: ComponentFixture<ModuloLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
