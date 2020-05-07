import { Pipe, PipeTransform } from '@angular/core';
import { iItem } from './items';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: iItem[], status: string): iItem[] {
    switch (status) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item['completed']);
      case 'completed':
        return items.filter((item) => item['completed']);
    }
  }
}
