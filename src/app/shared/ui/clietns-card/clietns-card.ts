import { Component, input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-clietns-card',
  imports: [NgOptimizedImage],
  templateUrl: './clietns-card.html',
  styleUrl: './clietns-card.scss',
})
export class ClietnsCard { 

  clientImage=input<string>('')

}
