import { Component } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Staff } from '../../../staff/data-access/models/staff.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FilterTableComponent } from '../../../../shared/components/filter-table/filter-table.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateStaffPopupComponent } from '../../feature-ui/create-staff-popup/create-staff-popup.component';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import {
  DeleteStaffAction,
  RoleStaffAction,
  StaffStateSelector,
} from '../../../staff/data-access/store';
import { RoleAccessActionsDirective } from '../../../../shared/directives/role-access/role-access.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-role-staffs',
  standalone: true,
  imports: [
    CommonModule,
    FilterTableComponent,
    FilterPipe,
    RoleAccessActionsDirective,
    TooltipDirective,
  ],
  templateUrl: './role-staffs.component.html',
  styleUrl: './role-staffs.component.scss',
})
export class RoleStaffsComponent {
  roleId!: number;
  roleName!: string;

  searchTerm!: string;
  /* Selects slice of assigned staff for role  state */
  @Select(StaffStateSelector.SliceOf('roleStaffList'))
  assigedStaff$!: Observable<Array<Staff>>;

  constructor(
    private _store: Store,
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['roleName']) {
        this.roleName = params['roleName'];
      }
    });
  }

  ngOnInit(): void {
    /**Get Role id and Role name from path */
    this._activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const roleId = params.get('id');
          if (roleId) {
            this.roleId = +roleId;
            this._store.dispatch(new RoleStaffAction(this.roleId));
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  goToBack(): void {
    this._location.back();
  }

  /**Filter List  */
  filterList(event: any) {
    this.searchTerm = event;
  }

  addStaff(): void {
    const modalRef = this._modalService.open(CreateStaffPopupComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.header = 'Create Staff';
    modalRef.componentInstance.roleId = this.roleId;
  }

  removeStaff(staffId: number): void {
    this._store.dispatch(new DeleteStaffAction(staffId, this.roleId));
  }
}
