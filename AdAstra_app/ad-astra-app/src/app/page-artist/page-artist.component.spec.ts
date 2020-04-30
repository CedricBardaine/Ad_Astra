import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArtistComponent } from './page-artist.component';

describe('PageArtistComponent', () => {
  let component: PageArtistComponent;
  let fixture: ComponentFixture<PageArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
