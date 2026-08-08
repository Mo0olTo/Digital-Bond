import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBackgorund } from './section-backgorund';

describe('SectionBackgorund', () => {
  let component: SectionBackgorund;
  let fixture: ComponentFixture<SectionBackgorund>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionBackgorund]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBackgorund);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
