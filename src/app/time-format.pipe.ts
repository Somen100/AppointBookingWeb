import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({ name: 'timeFormat' })
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    // Truncate milliseconds and return time in 'hh:mm:ss' format
    return value.slice(0, 8);
  }
}
