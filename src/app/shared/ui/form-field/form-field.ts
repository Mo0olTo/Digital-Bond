import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import IntlTelInput from '@intl-tel-input/angular';
import type { CountrySelectorMode, Iso2, UtilsLoader } from 'intl-tel-input';
import 'intl-tel-input/styles-no-assets';
import {
  CircleCheck,
  CircleX,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

import { ErrorMsg, FormFieldType } from '../error-msg/error-msg';
import { DEFAULT_COUNTRY_ORDER } from '../../constants/default.country.constants';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-form-field',
  imports: [FormsModule, IntlTelInput, ErrorMsg, LucideAngularModule],
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
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ CircleCheck, CircleX }),
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
  protected readonly isValid = signal(false);
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
    this.refreshValidationState();
  }

  protected onPhoneChange(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    this.onChange(next);
    this.refreshValidationState();
  }

  protected onBlur(): void {
    this.onTouched();
    this.refreshValidationState();
  }

  protected onPhoneValidityChange(isValid: boolean): void {
    this.phoneValid = isValid;
    this.onValidatorChange();
    this.refreshValidationState();
  }

  private bindControl(control: AbstractControl): void {
    this.boundControl = control;

    if (this.controlEventsBound) {
      return;
    }

    this.controlEventsBound = true;
    control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.controlVersion.update((version) => version + 1);
      this.refreshValidationState();
    });
  }

  private refreshValidationState(): void {
    const control = this.boundControl;
    const interacted = !!control && (control.touched || control.dirty);
    const hasValue = !!String(control?.value ?? '').trim();

    this.isInvalid.set(!!control && interacted && control.invalid);
    this.isValid.set(!!control && interacted && control.valid && hasValue);
  }
}
