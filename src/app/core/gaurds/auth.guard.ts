import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const document = inject(DOCUMENT);
  const router = inject(Router);

  const localStorage: Storage | undefined = document.defaultView?.localStorage;

  const authToken = localStorage?.getItem('auth_token');

  if (authToken) {
    return true;
  } else {
    router.navigate(['account/login']);
    return false;
  }
};
