import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorizedGuardService } from './authorized-guard.guard';

@Injectable({
  providedIn: 'root'
})
export class checkTokenGuard implements CanActivate {

  constructor(private router: Router, private token: AuthorizedGuardService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && token.length > 0 && this.token.getRoleFromToken() === 'ADMIN') {
      return true;
    }
    else if (token && token.length > 0 && this.token.getRoleFromToken() === 'USER'){
      alert('You are not authorized to view this page');
      this.router.navigate(['home']);
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}