import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min',
  standalone: true
})
export class MinPipe implements PipeTransform {
  transform(array: any[], field: string): any {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array.reduce((min, item) =>
      (item[field] < min[field] ? item : min), array[0]
    )[field];
  }
}
