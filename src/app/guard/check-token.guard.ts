import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class checkTokenGuard implements CanActivate {

  constructor(private router: Router, private location: Location) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && token.length > 0) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}