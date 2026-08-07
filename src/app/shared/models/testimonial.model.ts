export type ClientGender = 'male' | 'female';

export type ClientTitle = 'Owner' | 'CEO' | 'CTO';

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly title: ClientTitle;
  readonly company: string;
  readonly message: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly gender: ClientGender;
  readonly avatarSrc: string;
}
