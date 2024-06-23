import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  staffApiUrl = environment.apiURL + 'staff';

  constructor(private _http: HttpClient) {}

  /**To get staff assigned for the Role */
  getStaffForRole(roleId: number): Observable<Array<Staff>> {
    return this._http.get<Array<Staff>>(`${this.staffApiUrl}?roleId=${roleId}`);
  }

  /**To get staff List */
  getStaffList(): Observable<Array<Staff>> {
    return this._http.get<Array<Staff>>(`${this.staffApiUrl}`);
  }

  createStaff(staffObj: string): Observable<unknown> {
    return this._http.post<unknown>(`${this.staffApiUrl}`, staffObj);
  }

  updateStaff(staffId: string, values: any): Observable<unknown> {
    return this._http.put<unknown>(`${this.staffApiUrl}?staffId=${staffId}`, {
      ...values,
    });
  }

  deleteStaff(staffId: number): Observable<unknown> {
    return this._http.delete<unknown>(`${this.staffApiUrl}/${staffId}`);
  }
}
