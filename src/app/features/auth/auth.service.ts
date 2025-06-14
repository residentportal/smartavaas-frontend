import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IVerifyOtp } from './login/login.model';
import { iRegister as IRegister } from './register/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private router = inject(Router);
  constructor() {}

  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<IVerifyOtp>(`auth/login`, {
      email,
      password,
    });
  }
  register(data: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`users/register`, data);
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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isEmailValid(email: string) {
    return this.http.post<string>(`auth/check-email`, { email });
  }
  sendOtp(email: string) {
    return this.http.post<string>(`auth/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post<IVerifyOtp>(`auth/verify-otp`, {
      email,
      otp,
    });
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}
