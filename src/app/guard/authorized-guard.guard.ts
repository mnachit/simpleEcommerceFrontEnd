import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})


export class AuthorizedGuardService {

  constructor() { }

  token = localStorage.getItem('token');
  getEmailFromToken(): string {
    // Check if the token exists
    if (this.token) {
      // Decode the JWT token
      const decodedToken: any = jwtDecode(this.token);

      // Extract the email from the decoded token
      const email: string = decodedToken.email;

      return email;
    }

    return '';
  }

  getIdFromToken(): any {
    // Check if the token exists
    if (this.token) {
      // Decode the JWT token
      const decodedToken: any = jwtDecode(this.token);

      // Extract the id from the decoded token
      const id: string = decodedToken.id;

      return id;
    }
  }
}