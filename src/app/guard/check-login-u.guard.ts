import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthorizedGuardService } from './authorized-guard.guard';

export class checkLoginUGuard implements CanActivate {
  constructor(private router: Router, private token: AuthorizedGuardService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && token.length > 0) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
};
