import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOCIAL_LINKS } from '../nav/constants/nav.constants';


@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink, NgTemplateOutlet],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly socialLinks = SOCIAL_LINKS;
}
