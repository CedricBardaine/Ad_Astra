import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRegisterComponent } from './button-register.component';

describe('ButtonRegisterComponent', () => {
  let component: ButtonRegisterComponent;
  let fixture: ComponentFixture<ButtonRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
