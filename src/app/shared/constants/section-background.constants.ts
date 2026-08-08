export type SectionBackgroundName = 'about' | 'contact' | 'services';

export interface SectionBackgroundImage {
  readonly name: SectionBackgroundName;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** Cover images keyed for about / contact / services page banners. */
export const SECTION_BACKGROUND_IMAGES: readonly SectionBackgroundImage[] = [
  {
    name: 'about',
    src: '/images/About/about-cover.webp',
    alt: 'About Digital Bond',
    width: 1920,
    height: 600,
  },
  {
    name: 'contact',
    src: '/images/Contact/contact_cover.webp',
    alt: 'Contact Digital Bond',
    width: 1920,
    height: 600,
  },
  {
    name: 'services',
    src: '/images/Services/services_banner.webp',
    alt: 'Digital Bond services',
    width: 1920,
    height: 600,
  },
] as const;
