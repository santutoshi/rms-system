import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Staff } from '../../data-access/models/staff.model';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from '../../../../shared/components/filter-table/filter-table.component';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { Router } from '@angular/router';
import {
  GetStaffAction,
  StaffStateSelector,
  DeleteStaffAction,
} from '../../data-access/store';
import { RoleAccessActionsDirective } from '../../../../shared/directives/role-access/role-access.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    FilterTableComponent,
    FilterPipe,
    RoleAccessActionsDirective,
    TooltipDirective,
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  searchTerm!: string;
  /* Selects slice of staff list from feature state */
  @Select(StaffStateSelector.SliceOf('staffList'))
  staffList$!: Observable<Array<Staff>>;

  constructor(private _store: Store, private _router: Router) {}

  ngOnInit(): void {
    this._store.dispatch(new GetStaffAction());
  }

  /**Filter List  */
  filterList(event: any) {
    this.searchTerm = event;
  }

  removeStaff(staffId: number): void {
    const roleId = localStorage.getItem('roleId') ?? '1';
    this._store
      .dispatch(new DeleteStaffAction(staffId, +roleId))
      .subscribe((res) => {
        this._store.dispatch(new GetStaffAction());
      });
  }

  viewAllPermission(staffId: number, staffName: string): void {}
}
