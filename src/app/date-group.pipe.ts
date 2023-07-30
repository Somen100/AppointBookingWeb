import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateGroup'
})
export class DateGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
