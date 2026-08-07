import { LucideIconData } from 'lucide-angular';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIconData;
}
