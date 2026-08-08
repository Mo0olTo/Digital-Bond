import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
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
import { CarouselButton } from '../../../../shared/ui/carousel-button/carousel-button';
import { ClietnsCard } from '../../../../shared/ui/clietns-card/clietns-card';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';

@Component({
  selector: 'app-clients',
  imports: [ClietnsCard, CarouselButton, SectionTitle, NgOptimizedImage],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  private embla: EmblaCarouselType | null = null;
  private autoplayId: ReturnType<typeof setInterval> | null = null;

  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  readonly clients = signal<readonly string[]>([
    '/images/Clients/1-nuban.webp',
    '/images/Clients/2-ritkona.webp',
    '/images/Clients/3-tryngo.webp',
    '/images/Clients/4-EGEC.webp',
    '/images/Clients/5-Edugate.webp',
    '/images/Clients/6-instituto.webp',
    '/images/Clients/7-harvest.webp',
    '/images/Clients/8-transpedia.webp',
    '/images/Clients/9-conscentrix.webp',
    '/images/Clients/10-saleh.webp',
    '/images/Clients/11-rennie.webp',
    '/images/Clients/12-faroukPh.webp',
    '/images/Clients/13-DoctorHealth.webp',
    '/images/Clients/14SlimVits.webp',
    '/images/Clients/15-Organica.webp',
    '/images/Clients/16-CL200Pets.webp',
    '/images/Clients/17-Trumph.webp',
    '/images/Clients/18-Nasr.webp',
    '/images/Clients/19-Bright-way.webp',
    '/images/Clients/20-Signeture360.webp',
    '/images/Clients/21-AMID.webp',
    '/images/Clients/22-MSquared.webp',
    '/images/Clients/23-Expedia.webp',
    '/images/Clients/24-IAB.webp',
    '/images/Clients/25-WEELS.webp',
    '/images/Clients/26-General.webp',
    '/images/Clients/27-NUIT.webp',
    '/images/Clients/28-AUTOz.webp',
    '/images/Clients/29-Carats.webp',
    '/images/Clients/30-AhmedFayez.webp',
    '/images/Clients/31-Danube.webp',
    '/images/Clients/32-ArtHouse.webp',
    '/images/Clients/33-Divano.webp',
    '/images/Clients/34-Edges.webp',
    '/images/Clients/35-GoldenHome.webp',
    '/images/Clients/36-OG.webp',
    '/images/Clients/37-Classic.webp',
    '/images/Clients/38-HoneyDough.webp',
    '/images/Clients/39-Zi-Sushi.webp',
    '/images/Clients/40-KOI-Sushi.webp',
    '/images/Clients/41-Shishu-bar.webp',
    '/images/Clients/42-koyoto.webp',
    '/images/Clients/43-Tribu.webp',
    '/images/Clients/44-flaminco.webp',
    '/images/Clients/45-sushi-town.webp',
    '/images/Clients/46-ikoya.webp',
    '/images/Clients/47-MAQDESI.webp',
    '/images/Clients/48-Turbo.webp',
  ]);

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

    this.syncCarouselState();
    this.embla.on('select', () => this.syncCarouselState());
    this.embla.on('reInit', () => this.syncCarouselState());
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
