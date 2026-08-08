import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { ContactService } from '../../core/services/contact.service';
import { FormField } from '../../shared/ui/form-field/form-field';
import { SectionTitle } from "../../shared/ui/section-title/section-title";

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule, FormField, SectionTitle],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(450)],
    ],
  });

  onSubmit(): void {
    this.submitError.set(null);
    this.contactForm.markAllAsTouched();
    this.contactForm.updateValueAndValidity();

    if (this.contactForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.contactService
      .submit(this.contactForm.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/done']);
        },
        error: () => {
          this.submitError.set('Something went wrong. Please try again.');
        },
      });
  }
}
