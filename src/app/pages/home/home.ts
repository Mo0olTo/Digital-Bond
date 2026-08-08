import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { ServicesHome } from './components/services-home/services-home';
import { Clients } from './components/clients/clients';
import { Testimonials } from './components/testimonials/testimonials';
import { ContactHome } from './components/contact-home/contact-home';

@Component({
  selector: 'app-home',
  imports: [Hero, ServicesHome, Clients, Testimonials, ContactHome],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
