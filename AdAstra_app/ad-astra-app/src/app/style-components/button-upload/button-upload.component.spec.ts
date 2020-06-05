import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUploadComponent } from './button-upload.component';

describe('ButtonUploadComponent', () => {
  let component: ButtonUploadComponent;
  let fixture: ComponentFixture<ButtonUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
