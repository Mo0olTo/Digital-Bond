import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-done',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './done.html',
  styleUrl: './done.scss',
})
export class Done {}
