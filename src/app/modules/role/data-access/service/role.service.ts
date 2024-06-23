import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../models/roles';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleApiUrl = environment.apiURL + 'roles';
  constructor(private _http: HttpClient) {}

  /**To get the Role List */
  getRoleList(): Observable<Array<Role>> {
    return this._http.get<Array<any>>(`${this.roleApiUrl}`);
  }

  /**Get Role Details with roleId */
  getRoleDetails(roleId: number): Observable<Array<Role>> {
    return this._http.get<Array<any>>(`${this.roleApiUrl}?roleId=${roleId}`);
  }

  /**To Check if the Role name is duplicate or not  */
  checkDuplicateName(name: string): Observable<boolean> {
    return this.getRoleList().pipe(
      map((data) => {
        const dataMap = new Map(data.map((item) => [item.roleName, item])); // Assuming each item has an `name` property
        return dataMap.has(name);
      })
    );
  }

  createRole(role: string): Observable<unknown> {
    return this._http.post<unknown>(`${this.roleApiUrl}`, role);
  }

  updateRole(role: Role): Observable<any> {
    return this._http.put<any>(`${this.roleApiUrl}/${role.roleId}`, {
      ...role,
    });
  }

  deleteRole(roleId: number): Observable<unknown> {
    return this._http.delete<unknown>(`${this.roleApiUrl}/${roleId}`);
  }
}
