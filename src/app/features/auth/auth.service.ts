import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login/login.model';
import { Register } from './register/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  protected baseURL = 'https://drab-edyth-kahar12911-2937e591.koyeb.app/';
  private http = inject(HttpClient);

  login(data: Login) {
    return this.http.post<Login>(`${this.baseURL}auth/login`, data);
  }
  register(data: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseURL}users/register`, data);
  }
}
