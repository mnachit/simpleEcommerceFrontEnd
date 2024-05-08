import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private TOKEN_KEY = 'token';

  constructor() { }

  // Method to save token in localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Method to retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Method to remove token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
