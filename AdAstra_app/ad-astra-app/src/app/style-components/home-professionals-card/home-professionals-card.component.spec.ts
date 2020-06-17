import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfessionalsCardComponent } from './home-professionals-card.component';

describe('HomeProfessionalsCardComponent', () => {
  let component: HomeProfessionalsCardComponent;
  let fixture: ComponentFixture<HomeProfessionalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfessionalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfessionalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
