import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-filter-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.scss',
})
export class FilterTableComponent {
  @Output() filterTrigger = new EventEmitter();
  @ViewChild('inputField') inputField!: ElementRef;

  /*Search Roal*/
  search(event: any): void {
    const filter = event.target.value;
    this.filterTrigger.next(filter);
  }

  /**Trigger Filter */

  triggerfilter(): void {
    /**Auto Focus on Enter on same form  */
    this.inputField.nativeElement.focus();
  }

  /**Reset filter serch  */
  resetSearch(): void {
    this.inputField.nativeElement.value = '';
    this.filterTrigger.next('');
  }
}
