import { AbstractControl } from '@angular/forms';
import { Component, input } from '@angular/core';

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea';

@Component({
  selector: 'app-error-msg',
  imports: [],
  templateUrl: './error-msg.html',
  styleUrl: './error-msg.scss',
})
export class ErrorMsg {
  readonly control = input<AbstractControl | null>(null);
  readonly label = input('');
  readonly type = input<FormFieldType>('text');
  readonly errorId = input('');

  protected showErrors(): boolean {
    const control = this.control();
    if (!control) {
      return false;
    }

    return (control.touched || control.dirty) && !!control.errors;
  }
}
