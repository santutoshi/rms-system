import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControlValidationDirective } from '../../../../shared/directives/form-control-validation.directive';
import { Select, Store } from '@ngxs/store';
import { AuthStateSelector, LoginAction } from '../../data-access/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlValidationDirective],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  /* Selects slice of my role list loading from the my role feature state */
  @Select(AuthStateSelector.SliceOf('isLoading'))
  isLoading$!: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _store: Store
  ) {
    // redirect to home if already logged in
    if (this._authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this._store.dispatch(new LoginAction(this.loginForm.value));
  }
}
