import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:3000/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  loginWithGoogle(token: string) {
    return this.http.post(`${this.backendUrl}/google-login`, { token });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
