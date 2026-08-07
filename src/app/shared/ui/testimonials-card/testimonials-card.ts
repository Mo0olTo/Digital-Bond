import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  Star,
} from 'lucide-angular';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials-card',
  imports: [NgClass, NgOptimizedImage, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Star }),
    },
  ],
  templateUrl: './testimonials-card.html',
  styleUrl: './testimonials-card.scss',
})
export class TestimonialsCard {
  readonly testimonial = input.required<Testimonial>();

  readonly starSlots = [1, 2, 3, 4, 5] as const;
}
