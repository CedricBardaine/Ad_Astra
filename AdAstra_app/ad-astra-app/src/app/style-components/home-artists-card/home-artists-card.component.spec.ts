import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArtistsCardComponent } from './home-artists-card.component';

describe('HomeArtistsCardComponent', () => {
  let component: HomeArtistsCardComponent;
  let fixture: ComponentFixture<HomeArtistsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeArtistsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeArtistsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
