import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PermissionStateSelector } from '../../../modules/permission/data-access/store';
import { ModuleNode } from '../../../modules/permission/data-access/modal';
import { PermissionService } from '../../../modules/permission/data-access/service';

@Directive({
  selector: '[permissionCheck]',
  standalone: true,
})
export class RoleAccessActionsDirective implements OnInit, OnDestroy {
  @Input() mainGroup!: string; // Input for main Group
  @Input() subGroup!: string; // Input sub Group
  @Input() action!: string; // for actions

  /* Selects slice of role details feature state */
  // @Select(PermissionStateSelector.SliceOf('permissionList'))
  permissionList$!: Observable<Array<ModuleNode>>;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    const permision = localStorage.getItem('permissions') as string;
    const permissionList = JSON.parse(permision);

    const roleId = localStorage.getItem('roleId') as string;
    this.permissionList$ =
      this._permissionService.getPermissionData(permissionList);

    this.permissionList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Array<ModuleNode>) => {
        if (response) {
          const permision = localStorage.getItem('permissions') as string;
          const permissionList = JSON.parse(permision);
          const mainModulePermission = response.filter(
            (x: any) => x.id === this.mainGroup
          );

          if (mainModulePermission && mainModulePermission.length > 0) {
            const modelGroup = mainModulePermission[0].childs.filter(
              (x: any) => x.id === this.subGroup
            );

            if (modelGroup && modelGroup[0].expand) {
              const childs = modelGroup[0].childs.filter(
                (x: any) => x.id === this.action
              );

              if (childs && childs[0]?.id === this.action) {
                this.enableElement();
              } else {
                this.disableElement();
              }
            } else if (modelGroup[0].id === this.action) {
              this.enableElement();
            } else {
              this.disableElement();
            }
          } else {
            this.disableElement();
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private disableElement(): void {
    this._renderer.setAttribute(this._el.nativeElement, 'disabled', 'true');
  }

  private enableElement(): void {
    this._renderer.removeAttribute(this._el.nativeElement, 'disabled', 'true');
  }

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _permissionService: PermissionService
  ) {}
}
