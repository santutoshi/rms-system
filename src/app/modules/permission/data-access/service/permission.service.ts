import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  permissionURL = environment.apiURL + 'permission';

  constructor(private _router: Router, private _http: HttpClient) {}

  getPermissionForRole(): Observable<any> {
    return this._http.get<any>(`${this.permissionURL}`);
  }

  updatePermission(permisionList: any): Observable<any> {
    return this._http.put<any>(`${this.permissionURL}/${permisionList.id}`, {
      ...permisionList,
    });
  }

  // Method to filter data based on the input list of strings
  filterPermission(data: any[], permisionAllowed: string[]): any[] {
    return data.filter((item) => permisionAllowed.includes(item.id)); // Adjust 'name' to the property you need to filter by
  }

  // Method to get and filter data
  getPermissionData(filterList: string[]): Observable<any[]> {
    return this.getPermissionForRole().pipe(
      map((data) => this.filterPermission(data, filterList))
    );
  }
}
