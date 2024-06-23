import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../../data-access/models/roles';
import { Select, Store } from '@ngxs/store';
import { GetRoleAction, RoleStateSelector } from '../../data-access/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KebabIconActionComponent } from '../../feature-ui/kebab-icon-action/kebab-icon-action.component';
import { RoleFormModalComponent } from '../../feature-ui/common-modal/role-form.component';
import { FilterTableComponent } from '../../../../shared/components/filter-table/filter-table.component';
import { Router } from '@angular/router';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { RoleAccessActionsDirective } from '../../../../shared/directives/role-access/role-access.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KebabIconActionComponent,
    FilterTableComponent,
    FilterPipe,
    RoleAccessActionsDirective,
    TooltipDirective,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  searchTerm!: string;
  /* Selects slice of my role list from the my role feature state */
  @Select(RoleStateSelector.SliceOf('roleList'))
  roleList$!: Observable<Array<Role>>;

  /* Selects slice of my role list loading from the my role feature state */
  @Select(RoleStateSelector.SliceOf('isLoading'))
  isLoading$!: Observable<number>;

  constructor(
    private _store: Store,
    private _modalService: NgbModal,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._store.dispatch(new GetRoleAction());
  }

  /**Add Roles */
  addRole(actionType: string): void {
    const modalRef = this._modalService.open(RoleFormModalComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.header = 'Create Role';
    modalRef.componentInstance.actionType = actionType;
  }

  /**Get all the staff assigned for roles  */

  getAllStaff(roleId: number, roleName: string): void {
    this._router.navigate([`/details/${roleId}`], {
      queryParams: { roleName: roleName },
    });
  }

  /**To view the permission page  */
  viewRolePermission(roleId: number, roleName: string) {
    this._router.navigate([`/permission/${roleId}`], {
      queryParams: { roleName: roleName },
    });
  }

  /**Filter List  */
  filterList(event: any) {
    this.searchTerm = event;
  }
}
