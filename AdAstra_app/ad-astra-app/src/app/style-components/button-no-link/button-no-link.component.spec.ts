import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNoLinkComponent } from './button-no-link.component';

describe('ButtonNoLinkComponent', () => {
  let component: ButtonNoLinkComponent;
  let fixture: ComponentFixture<ButtonNoLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNoLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
