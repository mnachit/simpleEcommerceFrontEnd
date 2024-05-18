import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthorizedGuardService } from './authorized-guard.guard';

@Injectable({
  providedIn: 'root'
})
export class checkTokenIsExGuard implements CanActivate {
  constructor(private router: Router, private token: AuthorizedGuardService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
  
    if (token && token.length > 0) {
      this.router.navigate(['home']); // Navigate to home page
      return false; // Block navigation
    } else {
      return true; // Allow navigation to login page
    }
  }
  
};
