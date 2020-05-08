import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item';

@Pipe({
  name: 'statusFilter'
})

export class StatusFilterPipe implements PipeTransform {
  transform(items: Item[], status: string): Item[] {
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
