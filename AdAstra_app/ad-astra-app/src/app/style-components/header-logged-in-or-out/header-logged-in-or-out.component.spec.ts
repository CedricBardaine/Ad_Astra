import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedInOrOutComponent } from './header-logged-in-or-out.component';

describe('HeaderLoggedInOrOutComponent', () => {
  let component: HeaderLoggedInOrOutComponent;
  let fixture: ComponentFixture<HeaderLoggedInOrOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLoggedInOrOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLoggedInOrOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
