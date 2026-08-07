import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { ServicesHome } from './components/services-home/services-home';
import { Testimonials } from './components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [Hero, ServicesHome, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
