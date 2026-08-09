import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-done',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './done.html',
  styleUrl: './done.scss',
})
export class Done {
  private readonly contactService = inject(ContactService);

  readonly userName = this.contactService.userName;
}
