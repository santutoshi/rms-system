import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { RoleDetailAction } from './modules/role/data-access/store';
import { GetPermissionAction } from './modules/permission/data-access/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rms';

  constructor(private _store: Store) {
    const roleId = localStorage.getItem('roleId') ?? 1;
    this._store.dispatch(new RoleDetailAction(+roleId));
    this._store.dispatch(new GetPermissionAction());
  }
}
