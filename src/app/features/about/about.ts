import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { SectionBackgorund } from '../../shared/ui/section-backgorund/section-backgorund';
import { SectionTitle } from '../../shared/ui/section-title/section-title';


@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, SectionBackgorund, SectionTitle ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
