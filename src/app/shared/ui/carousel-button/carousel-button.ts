import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

@Component({
  selector: 'app-carousel-button',
  imports: [NgClass, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, ChevronRight }),
    },
  ],
  templateUrl: './carousel-button.html',
  styleUrl: './carousel-button.scss',
})
export class CarouselButton {
  readonly direction = input<'prev' | 'next'>('next');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('Next slide');
  readonly variant = input<'light' | 'dark'>('light');

  readonly pressed = output<void>();
}
