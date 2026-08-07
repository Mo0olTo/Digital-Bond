import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCard } from './counter-card';

describe('CounterCard', () => {
  let component: CounterCard;
  let fixture: ComponentFixture<CounterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
