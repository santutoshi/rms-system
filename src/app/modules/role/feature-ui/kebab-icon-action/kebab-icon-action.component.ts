import { CommonModule } from '@angular/common';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { RoleFormModalComponent } from '../common-modal/role-form.component';
import { CommonModalComponent } from '../../../../shared/components/common-modal/common-modal.component';
import { DeleteRoleAction } from '../../data-access/store';

@Component({
  selector: 'app-kebab-icon-action',
  standalone: true,
  imports: [CommonModule, RoleFormModalComponent, CommonModalComponent],
  templateUrl: './kebab-icon-action.component.html',
  schemas: [NO_ERRORS_SCHEMA],
  styleUrl: './kebab-icon-action.component.scss',
})
export class KebabIconActionComponent {
  @Input() roleId!: number;

  actions: Array<any> = [
    {
      name: 'Edit',
      iconClass: 'icon-edit',
      actions: 'edit',
    },
    {
      name: 'Delete',
      iconClass: 'icon-delete',
      actions: 'delete',
    },
  ];

  performAction(action: string, roldId: number): void {
    // Implement your action handling logic here based on the action string
    switch (action) {
      case 'edit':
        this.editRole(roldId);
        break;
      case 'delete':
        this.deleteRole(roldId);
        break;
      // Add more cases as per your actions
      default:
        console.log('Unknown action');
    }
  }

  constructor(private _store: Store, private _modalService: NgbModal) {}

  /**Edit Roles */
  editRole(roleId: number): void {
    const modalRef = this._modalService.open(RoleFormModalComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.header = 'Edit Role';
    modalRef.componentInstance.actionType = 'edit';
    modalRef.componentInstance.roleId = roleId;
  }

  /**Edit Roles */
  deleteRole(roleId: number): void {
    const modalRef = this._modalService.open(CommonModalComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.header = 'Delete Role';
    modalRef.componentInstance.message =
      'Are you sure you want to delete role?';
    modalRef.result.then((result) => {
      if (result === true) {
        this._store.dispatch(new DeleteRoleAction(roleId));
      }
    });
  }
}
