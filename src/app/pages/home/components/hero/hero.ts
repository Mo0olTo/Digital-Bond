import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HeroShowcaseImage } from '../../../../shared/models/hero-showcase-image';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private showcaseIntervalId: ReturnType<typeof setInterval> | null = null;
  private bondIntervalId: ReturnType<typeof setInterval> | null = null;

  readonly showcaseImages: readonly HeroShowcaseImage[] = [
    {
      src: '/images/icons/orange1.webp',
      alt: 'Orange product illustration',
      width: 320,
      height: 320,
    },
    {
      src: '/images/icons/lamp1.webp',
      alt: 'Lamp product illustration',
      width: 320,
      height: 320,
    },
    {
      src: '/images/icons/pc1.webp',
      alt: 'PC product illustration',
      width: 320,
      height: 320,
    },
  ];

  readonly activeShowcaseIndex = signal(0);
  readonly bondWhiteActive = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.showcaseIntervalId = setInterval(() => {
      this.activeShowcaseIndex.update(
        (index) => (index + 1) % this.showcaseImages.length,
      );
    }, 6000);

    this.bondIntervalId = setInterval(() => {
      this.bondWhiteActive.update((isWhite) => !isWhite);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.showcaseIntervalId !== null) {
      clearInterval(this.showcaseIntervalId);
      this.showcaseIntervalId = null;
    }

    if (this.bondIntervalId !== null) {
      clearInterval(this.bondIntervalId);
      this.bondIntervalId = null;
    }
  }
}
