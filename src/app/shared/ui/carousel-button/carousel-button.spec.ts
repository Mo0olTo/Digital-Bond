import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselButton } from './carousel-button';

describe('CarouselButton', () => {
  let component: CarouselButton;
  let fixture: ComponentFixture<CarouselButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
