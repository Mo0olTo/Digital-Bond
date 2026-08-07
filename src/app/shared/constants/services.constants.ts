import {
  Clapperboard,
  Laptop,
  Magnet,
  Megaphone,
  MessageSquare,
  Search,
  Share2,
  TrendingUp,
  UtensilsCrossed,
} from 'lucide-angular';
import { Service } from '../models/service.model';

// TODO: replace placeholder copy with final Digital Bond service content
export const SERVICES: readonly Service[] = [
  {
    id: 'branding',
    title: 'Branding',
    description:
      'Identity systems, visual language, and brand guidelines that feel premium and consistent.',
    icon: Megaphone,
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description:
      'Content strategy and creative systems that keep your channels active and on-brand.',
    icon: Share2,
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    description:
      'Paid acquisition campaigns focused on measurable growth across search and social.',
    icon: TrendingUp,
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Fast, accessible websites and product experiences built for conversion and scale.',
    icon: Laptop,
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description:
      'Technical and content SEO improvements that help the right audience find you.',
    icon: Search,
  },
  {
    id: 'video-production',
    title: 'Video Production',
    description:
      'Story-driven video content for campaigns, product launches, and social platforms.',
    icon: Clapperboard,
  },
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing',
    description:
      'Creator partnerships that extend reach with authentic, measurable collaborations.',
    icon: Magnet,
  },
  {
    id: 'food-styling',
    title: 'Food Styling',
    description:
      'Appetite-forward photography and styling crafted for menus, ads, and social feeds.',
    icon: UtensilsCrossed,
  },
  {
    id: 'sms-campaigns',
    title: 'SMS Campaigns',
    description:
      'Direct messaging sequences that drive awareness, retention, and timely conversions.',
    icon: MessageSquare,
  },
];
