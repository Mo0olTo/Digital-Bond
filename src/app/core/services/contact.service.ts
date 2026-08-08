import { Injectable } from '@angular/core';
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

  submit(payload: ContactPayload): Observable<void> {
    void payload;
    return of(undefined).pipe(delay(800));
  }
}
