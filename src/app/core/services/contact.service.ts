import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface ContactPayload {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly submittedName = signal<string | null>(null);

  readonly userName = this.submittedName.asReadonly();

  submit(payload: ContactPayload): Observable<void> {
    this.submittedName.set(payload.name.trim());
    return of(undefined).pipe(delay(800));
  }

  clearSubmittedName(): void {
    this.submittedName.set(null);
  }
}
