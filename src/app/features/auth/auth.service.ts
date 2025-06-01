import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from './login/login.model';
import { Register } from './register/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private router = inject(Router);
  constructor() {}

  protected baseURL = 'http://backend-710061159.us-east-1.elb.amazonaws.com/';
  private http = inject(HttpClient);

  login(data: Login) {
    return this.http.post<Login>(`${this.baseURL}auth/login`, data);
  }
  register(data: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseURL}users/register`, data);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(this.TOKEN_KEY);

    if (!token) return false;

    const payload = this.decodeToken(token);
    const isExpired = payload?.exp * 1000 < Date.now();

    return !isExpired;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
