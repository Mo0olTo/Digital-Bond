import { Testimonial } from '../models/testimonial.model';

const AVATAR = {
  male: '/images/Tesimonials/avatar-male.png',
  female: '/images/Tesimonials/avatar-female.jpg',
} as const;

// TODO: replace placeholder testimonials with approved Digital Bond copy
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'maya-hassan',
    name: 'Maya Hassan',
    title: 'CEO',
    company: 'Northline Studio',
    gender: 'female',
    avatarSrc: AVATAR.female,
    rating: 5,
    message:
      'Digital Bond reshaped our brand voice and launch plan. Clear strategy, sharp creative, and results we could measure within the first month.',
  },
  {
    id: 'omar-farid',
    name: 'Omar Farid',
    title: 'CTO',
    company: 'Pulse Commerce',
    gender: 'male',
    avatarSrc: AVATAR.male,
    rating: 5,
    message:
      'Their team moved fast without cutting quality. Our site felt premium, performed better, and finally matched the product we built.',
  },
  {
    id: 'layla-nasser',
    name: 'Layla Nasser',
    title: 'Owner',
    company: 'Cedar & Co.',
    gender: 'female',
    avatarSrc: AVATAR.female,
    rating: 4,
    message:
      'From social content to paid campaigns, everything felt connected. We stopped guessing and started growing with a plan we trust.',
  },
  {
    id: 'karim-adel',
    name: 'Karim Adel',
    title: 'CEO',
    company: 'Atlas Retail',
    gender: 'male',
    avatarSrc: AVATAR.male,
    rating: 5,
    message:
      'Working with Digital Bond felt like adding a senior growth partner. Smart ideas, calm delivery, and creative that actually converts.',
  },
  {
    id: 'sara-elmenyawi',
    name: 'Sara Elmenyawi',
    title: 'CTO',
    company: 'Orbit Labs',
    gender: 'female',
    avatarSrc: AVATAR.female,
    rating: 5,
    message:
      'They understood both brand and product. The new digital experience is cleaner, faster, and far easier for our customers to use.',
  },
  {
    id: 'youssef-rami',
    name: 'Youssef Rami',
    title: 'Owner',
    company: 'Harbor Foods',
    gender: 'male',
    avatarSrc: AVATAR.male,
    rating: 4,
    message:
      'Our campaigns finally look like us and perform like a real business. Communication was clear, timelines were respected, and output stayed sharp.',
  },
  {
    id: 'noura-salem',
    name: 'Noura Salem',
    title: 'CEO',
    company: 'Lumen Media',
    gender: 'female',
    avatarSrc: AVATAR.female,
    rating: 5,
    message:
      'Premium thinking with practical execution. Digital Bond helped us clarify positioning and ship work our team is proud to share.',
  },
];
