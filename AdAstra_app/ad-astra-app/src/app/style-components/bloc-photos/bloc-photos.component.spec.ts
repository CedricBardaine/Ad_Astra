import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocPhotosComponent } from './bloc-photos.component';

describe('BlocPhotosComponent', () => {
  let component: BlocPhotosComponent;
  let fixture: ComponentFixture<BlocPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
