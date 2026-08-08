import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-card',
  imports: [LucideAngularModule],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  readonly service = input.required<Service>();

  readonly variant = input<'timeline' | 'card'>('timeline');
}
