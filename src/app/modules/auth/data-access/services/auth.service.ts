import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthDTO, User } from '../models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = environment.apiURL + 'users';

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private _router: Router, private _http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(body: AuthDTO): Observable<any> {
    return this._http.get<any>(`${this.authURL}?username=${body.username}`);
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/account/login']);
  }
}
