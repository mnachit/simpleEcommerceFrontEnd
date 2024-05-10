import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class checkLoginGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token || token.length <= 0) {
      return false;
    } else {
      this.router.navigate(['home']);
      return true;
    }
  }
}
