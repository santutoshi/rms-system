import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ModuleNode } from '../../data-access/modal';
import { RoleAccessActionsDirective } from '../../../../shared/directives/role-access/role-access.directive';
import { FormControlValidationDirective } from '../../../../shared/directives/form-control-validation.directive';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { PermissionService } from '../../data-access/service';
import { Select, Store } from '@ngxs/store';
import {
  RoleStateSelector,
  SelectedRoleDetailAction,
} from '../../../role/data-access/store';
import { Role } from '../../../role/data-access/models/roles';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { PermissionUpdateAction } from '../../data-access/store';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoleAccessActionsDirective,
    FormControlValidationDirective,
    TooltipDirective,
  ],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss',
})
export class PermissionComponent implements OnInit {
  /* Selects slice of role details feature state */
  @Select(RoleStateSelector.SliceOf('selectedRoleDetail'))
  roleDetails$!: Observable<Role>;

  isEditable = false;

  roleDetail!: Role;
  permissionList$!: Observable<Array<ModuleNode>>;

  permisiionList!: Array<ModuleNode>;
  treeForm!: FormGroup;

  constructor(
    private _fb: UntypedFormBuilder,
    private readonly _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _permissionService: PermissionService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.initTreeFrormGroup();
    this.roleDetails$.subscribe((res) => {
      this.roleDetail = res;
    });

    /**Patch value from role Details  */

    this.roleDetails$.subscribe((res) => {
      this.createFormArrayList(res.permissions, res.roleId);
    });

    /**Get Role id and Role name from path */
    this._activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const roleId = params.get('id');

          if (roleId) {
            this._store.dispatch(new SelectedRoleDetailAction(roleId));
          } else {
            const roleIdFromStore = localStorage.getItem('roleId') ?? '1';
            const permision = localStorage.getItem('permissions') as string;
            const permissionList = JSON.parse(permision);
            this.createFormArrayList(permissionList, roleIdFromStore);
          }
          return EMPTY;
        })
      )
      .subscribe();

    /**Get Role Name */
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['roleName']) {
        this.treeForm.get('roleName')?.setValue(params['roleName']);
      } else if (Object.keys(params).length === 0) {
        const roleName = localStorage.getItem('role');
        this.treeForm.get('roleName')?.setValue(roleName);
      }
    });
  }

  initTreeFrormGroup(): void {
    this.treeForm = this._fb.group({
      roleName: this._fb.control('', { validators: [Validators.required] }),
      groups: this._fb.array([]),
    });
  }

  createFormArrayList(permissionList: Array<string>, roleId: string): void {
    this.permissionList$ =
      this._permissionService.getPermissionData(permissionList);

    /**Subscribe the Permisision list and create the form array  */
    this.permissionList$.subscribe((response) => {
      if (response && response.length) {
        const groupFormGroups = response.map((group) =>
          this.createGroupFormGroup(group)
        );
        this.treeForm.setControl('groups', new FormArray(groupFormGroups));
      }
    });
  }

  createGroupFormGroup(group: any): FormGroup {
    return this._fb.group({
      id: [group.id],
      name: [group.name],
      checked: [group.checked],
      expand: [group.expand],
      childs: this._fb.array(
        group.childs.map((item: any) => this.createItemFormGroup(item))
      ),
    });
  }

  createItemFormGroup(item: any): FormGroup {
    return this._fb.group({
      id: [item.id],
      name: [item.name],
      checked: [item.checked],
      expand: [item.expand],
      childs: this._fb.array(
        item.childs.map((child: any) => this.createChildFormGroup(child))
      ),
    });
  }

  createChildFormGroup(child: any): FormGroup {
    return this._fb.group({
      id: [child.id],
      name: [child.name],
      expand: [child.expand],
      childs: [child.childs],
      checked: [child.checked],
    });
  }

  get groups(): FormArray {
    return this.treeForm.get('groups') as FormArray;
  }

  getItems(index: number): FormArray {
    return this.groups.at(index).get('childs') as FormArray;
  }

  getChilds(groupIndex: number, itemIndex: number): FormArray {
    return this.getItems(groupIndex).at(itemIndex).get('childs') as FormArray;
  }

  checkModule(moduleIndex: number): void {
    const rootGroup = this.treeForm.controls['groups'] as FormArray;
    const selectedRoot = rootGroup.at(moduleIndex) as FormGroup;
    const rootValue = selectedRoot.value;
    const groupControls = this.getItems(moduleIndex) as FormArray;
    groupControls.controls.forEach((group, groupIndex) => {
      const gControl = group as FormGroup;
      gControl.controls['checked'].setValue(rootValue.checked);
      const subGroupList = gControl.get('childs') as FormArray;
      subGroupList.controls.forEach((child, index) => {
        const childControl = child as FormGroup;
        childControl.controls['checked'].setValue(rootValue);
        this.checkParent(moduleIndex, index);
      });
    });
  }

  checkParent(groupIndex: number, itemIndex: number): void {
    const rootGroup = this.treeForm.controls['groups'] as FormArray;
    const groupControl = rootGroup.at(groupIndex) as FormGroup;
    const childControls = this.getItems(groupIndex).at(itemIndex) as FormArray;
    const controlValues = childControls.value;
    const isChecked = controlValues.checked;

    const subChildControls = childControls.get('childs') as FormArray;
    subChildControls.controls.forEach((child) => {
      const childControl = child as FormGroup;
      childControl.controls['checked'].setValue(isChecked);
      groupControl.get('checked')?.setValue(isChecked);
    });
  }

  checkChild(mGIndex: number, sGIndex: number, childIndex: number): void {
    const rootGroup = this.treeForm.controls['groups'] as FormArray;
    const groupControl = rootGroup.at(mGIndex) as FormGroup;
    const subGroupList = groupControl.get('childs') as FormArray;
    const subGroupControl = subGroupList.at(sGIndex) as FormGroup;
    const subGroupControlList = subGroupControl.get('childs') as FormArray;
    const childControl = subGroupControlList.at(childIndex) as FormGroup;
    const childValue = childControl.value;
    if (childValue.checked) {
      groupControl.get('checked')?.setValue(childValue.checked);
      subGroupControl.get('checked')?.setValue(childValue.checked);
    }
  }

  goToBack(): void {
    this._location.back();
  }

  savePermission(): void {
    this.isEditable = true;

    this.groups.value.forEach((element: any) => {
      this._store.dispatch(new PermissionUpdateAction(element));
    });
  }
}
