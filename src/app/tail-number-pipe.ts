import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tailNumber',
})
export class TailNumberPipe implements PipeTransform {
  transform(value?: string, columnName?: string): string {
    if (value && value.length > 0 && columnName == "tailNumber")
    {
      return `${value[0]}-${value.substring(1)}`
    }
    return value ?? "";
  }
}
