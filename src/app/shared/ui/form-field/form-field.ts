import { Component, DestroyRef,forwardRef,inject,input,PLATFORM_ID,signal,} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {AbstractControl,ControlValueAccessor,FormsModule,NG_VALIDATORS,NG_VALUE_ACCESSOR,ValidationErrors,Validator,} from '@angular/forms';
import IntlTelInput from '@intl-tel-input/angular';
import type { CountrySelectorMode, Iso2, UtilsLoader } from 'intl-tel-input';
import 'intl-tel-input/styles-no-assets';

import { ErrorMsg, FormFieldType } from '../error-msg/error-msg';
import { DEFAULT_COUNTRY_ORDER } from '../../constants/default.country.constants';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-form-field',
  imports: [FormsModule, IntlTelInput, ErrorMsg],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormField),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormField),
      multi: true,
    },
  ],
})
export class FormField implements ControlValueAccessor, Validator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly type = input<FormFieldType>('text');
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly inputId = input.required<string>();
  readonly autocomplete = input('');
  readonly rows = input(6);
  readonly initialCountry = input<Iso2>('eg');
  readonly countryOrder = input<Iso2[]>(DEFAULT_COUNTRY_ORDER);
  readonly countrySearch = input(true);
  readonly separateDialCode = input(true);
  readonly matchDropdownWidth = input(false);
  readonly countrySelectorMode = input<CountrySelectorMode>('DROPDOWN');

  private readonly controlVersion = signal(0);
  private boundControl: AbstractControl | null = null;
  private controlEventsBound = false;

  protected readonly value = signal('');
  protected readonly disabled = signal(false);
  protected readonly isInvalid = signal(false);
  protected readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly loadUtils: UtilsLoader = () => import('intl-tel-input/utils');

  private onChange: OnChangeFn = () => undefined;
  private onTouched: OnTouchedFn = () => undefined;
  private onValidatorChange: () => void = () => undefined;
  private phoneValid = true;

  get control(): AbstractControl | null {
    this.controlVersion();
    return this.boundControl;
  }

  protected get errorId(): string {
    return `${this.inputId()}-error`;
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.bindControl(control);

    if (this.type() !== 'tel') {
      return null;
    }

    const current = String(control.value ?? '').trim();
    if (!current) {
      return null;
    }

    return this.phoneValid ? null : { invalidPhone: true };
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(target.value);
    this.onChange(target.value);
    this.refreshInvalidState();
  }

  protected onPhoneChange(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    this.onChange(next);
    this.refreshInvalidState();
  }

  protected onBlur(): void {
    this.onTouched();
    this.refreshInvalidState();
  }

  protected onPhoneValidityChange(isValid: boolean): void {
    this.phoneValid = isValid;
    this.onValidatorChange();
    this.refreshInvalidState();
  }

  private bindControl(control: AbstractControl): void {
    this.boundControl = control;

    if (this.controlEventsBound) {
      return;
    }

    this.controlEventsBound = true;
    control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.controlVersion.update((version) => version + 1);
      this.refreshInvalidState();
    });
  }

  private refreshInvalidState(): void {
    const control = this.boundControl;
    this.isInvalid.set(!!control && control.invalid && (control.touched || control.dirty));
  }
}
