import { isPlatformBrowser } from '@angular/common';
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
import { SERVICES } from '../../../../shared/constants/services.constants';
import { CarouselButton } from '../../../../shared/ui/carousel-button/carousel-button';
import { ServiceCard } from '../../../../shared/ui/service-card/service-card';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';

@Component({
  selector: 'app-services-home',
  imports: [ServiceCard, CarouselButton, SectionTitle],
  templateUrl: './services-home.html',
  styleUrl: './services-home.scss',
})
export class ServicesHome implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  private embla: EmblaCarouselType | null = null;
  private autoplayId: ReturnType<typeof setInterval> | null = null;

  readonly services = SERVICES;
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly selectedIndex = signal(0);
  readonly scrollSnaps = signal<readonly number[]>([]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.embla = EmblaCarousel(this.viewport().nativeElement, {
      align: 'center',
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
    }, 3500);
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
