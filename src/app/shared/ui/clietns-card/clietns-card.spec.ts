import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClietnsCard } from './clietns-card';

describe('ClietnsCard', () => {
  let component: ClietnsCard;
  let fixture: ComponentFixture<ClietnsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClietnsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClietnsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
