import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
  standalone: true
})
export class StockStatusPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 3) return 'In Stock';
    if (value >= 1 && value <= 3) return 'Low Stock';
    return 'Out of Stock'; // If 0 or less
  }

}