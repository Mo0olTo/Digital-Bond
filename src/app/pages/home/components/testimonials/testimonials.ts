import { isPlatformBrowser, NgClass, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import { TESTIMONIALS } from '../../../../shared/constants/testimonials.constants';
import { CarouselButton } from '../../../../shared/ui/carousel-button/carousel-button';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { TestimonialsCard } from '../../../../shared/ui/testimonials-card/testimonials-card';

@Component({
  selector: 'app-testimonials',
  imports: [NgClass, NgOptimizedImage, CarouselButton, SectionTitle, TestimonialsCard],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  private embla: EmblaCarouselType | null = null;
  private autoplayId: ReturnType<typeof setInterval> | null = null;

  readonly testimonials = TESTIMONIALS;
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly selectedIndex = signal(0);
  readonly scrollSnaps = signal<readonly number[]>([]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.embla = EmblaCarousel(this.viewport().nativeElement, {
      align: 'start',
      loop: true,
      skipSnaps: false,
      dragFree: false,
    });

    this.scrollSnaps.set(this.embla.scrollSnapList());
    this.syncCarouselState();

    this.embla.on('select', () => this.syncCarouselState());
    this.embla.on('reInit', () => {
      this.scrollSnaps.set(this.embla?.scrollSnapList() ?? []);
      this.syncCarouselState();
    });

    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.embla?.destroy();
    this.embla = null;
  }

  scrollPrev(): void {
    this.embla?.scrollPrev();
    this.restartAutoplay();
  }

  scrollNext(): void {
    this.embla?.scrollNext();
    this.restartAutoplay();
  }

  scrollTo(index: number): void {
    this.embla?.scrollTo(index);
    this.restartAutoplay();
  }

  onPointerEnter(): void {
    this.stopAutoplay();
  }

  onPointerLeave(): void {
    this.startAutoplay();
  }

  private syncCarouselState(): void {
    if (!this.embla) {
      return;
    }

    this.selectedIndex.set(this.embla.selectedScrollSnap());
    this.canScrollPrev.set(this.embla.canScrollPrev());
    this.canScrollNext.set(this.embla.canScrollNext());
  }

  private startAutoplay(): void {
    if (!isPlatformBrowser(this.platformId) || this.autoplayId !== null) {
      return;
    }

    this.autoplayId = setInterval(() => {
      this.embla?.scrollNext();
    }, 4000);
  }

  private stopAutoplay(): void {
    if (this.autoplayId === null) {
      return;
    }

    clearInterval(this.autoplayId);
    this.autoplayId = null;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
