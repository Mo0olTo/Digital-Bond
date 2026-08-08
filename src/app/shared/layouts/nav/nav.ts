import { DOCUMENT, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  Menu,
  X,
} from 'lucide-angular';
import { NAV_LINKS, SOCIAL_LINKS } from './constants/nav.constants';

const SCROLL_THRESHOLD_PX = 24;

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgTemplateOutlet,
    LucideAngularModule,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Menu, X }),
    },
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly navLinks = NAV_LINKS;
  readonly socialLinks = SOCIAL_LINKS;

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      const win = this.document.defaultView;
      if (!win) {
        return;
      }

      const onScroll = (): void => {
        this.scrolled.set(win.scrollY > SCROLL_THRESHOLD_PX);
      };

      const onKeydown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && this.menuOpen()) {
          this.closeMenu();
        }
      };

      onScroll();
      win.addEventListener('scroll', onScroll, { passive: true });
      this.document.addEventListener('keydown', onKeydown);

      this.destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', onScroll);
        this.document.removeEventListener('keydown', onKeydown);
      });
    });
  } 

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
