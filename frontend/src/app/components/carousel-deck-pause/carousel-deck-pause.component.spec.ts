import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDeckPauseComponent } from './carousel-deck-pause.component';

describe('CarouselDeckPauseComponent', () => {
  let component: CarouselDeckPauseComponent;
  let fixture: ComponentFixture<CarouselDeckPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselDeckPauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselDeckPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
