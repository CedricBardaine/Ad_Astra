import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocSimilarArtistsComponent } from './bloc-similar-artists.component';

describe('BlocSimilarArtistsComponent', () => {
  let component: BlocSimilarArtistsComponent;
  let fixture: ComponentFixture<BlocSimilarArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocSimilarArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocSimilarArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
