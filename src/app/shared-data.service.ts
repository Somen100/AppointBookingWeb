import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private firstNameValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setFirstName(firstName: string) {
    this.firstNameValue.next(firstName);
  }

  getFirstName(): BehaviorSubject<string> {
    return this.firstNameValue;
  }
}
