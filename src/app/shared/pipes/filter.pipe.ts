import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[] | null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return Object.keys(it).some((key) => {
        return it[key].toString().toLowerCase().includes(searchText);
      });
    });
  }
}
