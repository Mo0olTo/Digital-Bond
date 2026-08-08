import { Component } from '@angular/core';

import { SERVICES } from '../../shared/constants/services.constants';
import { SectionBackgorund } from '../../shared/ui/section-backgorund/section-backgorund';
import { ServiceCard } from '../../shared/ui/service-card/service-card';
import { SectionTitle } from "../../shared/ui/section-title/section-title";

@Component({
  selector: 'app-services',
  imports: [SectionBackgorund, ServiceCard, SectionTitle],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services = SERVICES;
}
