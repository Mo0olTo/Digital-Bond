import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { SECTION_BACKGROUND_IMAGES, SectionBackgroundImage, SectionBackgroundName,} from '../../constants/section-background.constants';

@Component({
  selector: 'app-section-backgorund',
  imports: [NgOptimizedImage],
  templateUrl: './section-backgorund.html',
  styleUrl: './section-backgorund.scss',
})
export class SectionBackgorund {

  sectionName = input.required<SectionBackgroundName>();
  title=input.required<string>()
  
   backgrounds = SECTION_BACKGROUND_IMAGES;

   activeBackground = computed<SectionBackgroundImage | undefined>(() =>
    this.backgrounds.find((image) => image.name === this.sectionName()),
  );
}
