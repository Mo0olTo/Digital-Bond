export interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly exact: boolean;
}

export type SocialIcon = 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'tiktok';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', path: '/home', exact: true },
  { label: 'About', path: '/about', exact: true },
  { label: 'Services', path: '/services', exact: true },
  { label: 'Contact', path: '/contact-us', exact: true },
] as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/digitalbondmena/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/DigitalBondMena/', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/digital-bond/', icon: 'linkedin' },
  { label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=2001021551322&text=', icon: 'whatsapp' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@digitalbondmena', icon: 'tiktok' },
] as const;

